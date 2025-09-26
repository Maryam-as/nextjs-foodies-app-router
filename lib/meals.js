import sql from "better-sqlite3";

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
