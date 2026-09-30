// --- Tally :: Container Functions --- //

import { db, tally_db } from "../db.js";

export async function createContainer({
  key = "default",
  name = "Main Menu",
} = {}) {
  await tally_db;

  const existingContainer = await db.query(
    "SELECT * FROM container ORDER BY id LIMIT 1;",
  );

  if (existingContainer.rows.length > 0) {
    console.log("DB: Already exists!");
    return existingContainer.rows[0];
  }

  const result = await db.query(
    `
        INSERT INTO container (key, name)
        VALUES ($1, $2)
        RETURNING *;
        `,
    [key, name],
  );

  console.log("DB: Create container!");
  return result.rows[0];
}

// Retrieve the container, and its content. Like a main menu.
export default async function getContainer() {
  await tally_db;

  const result = await db.query("SELECT * FROM container ORDER BY id");

  // Return a value, or if there's no rows, return null.
  return result.rows[0] ?? null;
}
