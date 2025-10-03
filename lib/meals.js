import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
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
 * Persists a new meal record in the database and uploads its image to Cloudinary.
 *
 * Workflow:
 * 1. Generates a slug from the meal title (for unique identification in URLs).
 * 2. Sanitizes the instructions field to prevent XSS attacks.
 * 3. Uploads the image to Cloudinary and updates the meal object with the returned URL.
 * 4. Inserts the meal data into the SQLite database.
 */
export async function saveMeal(meal) {
  // Generate a slug from the meal title and add it to the meal object
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize the instructions to prevent XSS attacks
  // Overwrite the original instructions property with the sanitized value
  meal.instructions = xss(meal.instructions);

  // Upload the image to Cloudinary and replace local path with URL
  if (meal.image) {
    // Convert File/Blob to a temporary file path if needed or directly pass the file path
    const imageUrl = await uploadImage(meal.image.path || meal.image.filepath);
    meal.image = imageUrl;
  }

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
