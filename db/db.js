// --- Tally :: Init DB --- //

import { PGlite } from "@electric-sql/pglite";
import schemaSQL from "./schema/main_schema.sql?raw";

export const db = new PGlite("idb://tally"); // Creates a new pglite database, called db.

export const tally_db = db.exec(schemaSQL); // Executes the schame creation in main_schema.sql
