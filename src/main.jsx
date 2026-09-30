import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createMenu } from "../db/functions/menu_funcs.js";

async function bootstrap() {
  const menu = await createMenu();
  console.table([menu]);

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap().catch((error) => {
  console.error("Failed to initialize the database.", error);
});
