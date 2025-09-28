import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

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
 * Persists a new meal record in the database and saves its associated image file.
 *
 * Workflow:
 * 1. Generates a slug from the meal title (for unique identification in URLs).
 * 2. Sanitizes the instructions field to prevent XSS attacks.
 * 3. Saves the uploaded image to the /public/images folder with a slug-based filename.
 * 4. Updates the meal object to reference the stored image path.
 * 5. Inserts the meal data into the SQLite database.
 */
export async function saveMeal(meal) {
  // Generate a slug from the meal title and add it to the meal object
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize the instructions to prevent XSS attacks
  // Overwrite the original instructions property with the sanitized value
  meal.instructions = xss(meal.instructions);

  // Extract the file extension from the uploaded image (e.g., "jpg", "png")
  const extension = meal.image.name.split(".").pop();

  // Build a new image file name based on the slug + extension
  const fileName = `${meal.slug}.${extension}`;

  // Create a writable stream to save the uploaded image to the /public/images folder
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  // Convert the uploaded image (File/Blob) to a Node.js Buffer
  const bufferedImage = await meal.image.arrayBuffer();

  // Write the image data to the file system
  // If the write fails, throw an error
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  // Replace the meal.image property with the relative path to the stored file
  meal.image = `/images/${fileName}`;

  // Insert the meal record into the database with all its properties
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
