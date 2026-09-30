import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createContainer } from "../db/functions/container_funcs.js";

async function bootstrap() {
  const container = await createContainer();
  console.table([container]);

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap().catch((error) => {
  console.error("Failed to initialize the database.", error);
});
