import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { getDatabaseTables } from "../db/functions/menu_funcs.js";

async function bootstrap() {
  const tables = await getDatabaseTables();

  tables.forEach((table) => console.table(table.rows));

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App tables={tables} />
    </StrictMode>,
  );
}

bootstrap().catch((error) => {
  console.error("Failed to initialize the database.", error);
});
