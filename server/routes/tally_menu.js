import { Router } from "express";
import tally_db from "../tally_db.js";
import idValidation from "../validation/tally_db_validation.js";

const tally_router = Router();

/*
Menu API Routing

/api/menu/              GET             Returns the entire menu
/api/menu/              PUT             Adds a new scenario
/api/menu/:id           DELETE          Removes that entry
/api/menu/:id           GET             For selecting a certain scenario
*/

tally_router.get("/", (_req, res) => {
  res.json({
    message: "This is a test to see if we have it working!",
  });
});

tally_router.get("/:id", (req, res) => {
  // Validate parameters
  const user_submitted_id = Number(req.params.id);

  if (!idValidation(user_submitted_id)) {
    return res.status(400).json({
      error: "ERROR: ID must be a valid integer value.",
    });
  }

  try {
    const tally_menu_item = tally_db
      .prepare("SELECT * FROM main WHERE id = ?")
      .get(user_submitted_id);

    if (!tally_menu_item) {
      return res.status(404).json({
        message: "ERROR: Requested menu item, from ID, was not found",
      });
    }

    res.json(tally_menu_item);
  } catch (error) {
    console.error("ERROR: Failed to retrieve menu items: ", error);
    res.status(500).json({
      message: "ERROR: Unable to retrieve menu items",
    });
  }
});

export default tally_router;
