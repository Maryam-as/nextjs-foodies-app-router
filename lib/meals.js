import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs/promises";
import path from "path";
import os from "os";

import { uploadImage } from "./cloudinary";

// Establish a connection to the meals database
const db = sql("meals.db");

export async function getMeals() {
  // Simulate a delay (e.g. slow network or heavy query)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fetch all meals from the database
  return db.prepare(`SELECT * FROM meals`).all();
}

export function getMeal(slug) {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

/**
 * saveMeal
 *
 * Saves a new meal to the SQLite database and uploads its image to Cloudinary.
 *
 * Workflow:
 * 1. Generates a URL-friendly slug from the meal title for unique identification.
 * 2. Sanitizes the instructions field using XSS protection to prevent injection attacks.
 * 3. Validates that an image is provided; throws an error if missing.
 * 4. Extracts the image file extension and constructs a new filename based on the slug.
 * 5. Writes the uploaded image temporarily to the OS temp directory.
 * 6. Uploads the temporary image to Cloudinary and replaces the local file path with the returned secure URL.
 * 7. Cleans up the temporary file regardless of whether the upload succeeds or fails.
 * 8. Inserts the complete meal record (including the Cloudinary image URL) into the database.
 *
 * This function ensures safe handling of user input and images while maintaining database integrity.
 */

export async function saveMeal(meal) {
  // Generate a slug from the meal title
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize instructions
  meal.instructions = xss(meal.instructions);

  if (!meal.image) {
    throw new Error("No image provided for meal");
  }

  // Extract file extension and build filename
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // Save uploaded file to a temporary path
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const buffer = Buffer.from(await meal.image.arrayBuffer());
  await fs.writeFile(tempFilePath, buffer);

  try {
    // Upload to Cloudinary
    const imageUrl = await uploadImage(tempFilePath, fileName);
    meal.image = imageUrl;
  } finally {
    // Remove temp file whether upload succeeds or fails
    await fs.unlink(tempFilePath).catch(() => {});
  }

  // Insert the meal record into the database
  db.prepare(
    `
    INSERT INTO meals
      (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (
      @slug,
      @title,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
    )
    `
  ).run(meal);
}
