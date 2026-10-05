// --- Tally :: Menu Functions --- //

import { db, tally_db } from "../db.js";

export async function createMenu({ key = "default", name = "Main Menu" } = {}) {
  await tally_db;

  const existingMenu = await db.query(
    "SELECT * FROM menu WHERE key = $1 LIMIT 1;",
    [key],
  );

  if (existingMenu.rows.length > 0) {
    console.log("DB: Menu already exists!");
    return existingMenu.rows[0];
  }

  const result = await db.query(
    `
        INSERT INTO menu (key, name)
        VALUES ($1, $2)
        RETURNING *;
        `,
    [key, name],
  );

  console.log("DB: Create menu!");
  return result.rows[0];
}

// Retrieve the menu and its content. Like a main menu.
export default async function getMenu() {
  await tally_db;

  const result = await db.query("SELECT * FROM menu ORDER BY id");

  // Return a value, or if there are no rows, return null.
  return result.rows[0] ?? null;
}

// DEBUG :: Show tables
export async function getDatabaseTables() {
  await tally_db;

  const tableResult = await db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);

  const tables = [];

  for (const { table_name: tableName } of tableResult.rows) {
    try {
      const result = await db.query(`SELECT * FROM "${tableName}" ORDER BY 1;`);
      tables.push({ name: tableName, rows: result.rows });
    } catch (error) {
      console.warn(`Skipping table ${tableName}:`, error);
    }
  }

  return tables;
}
