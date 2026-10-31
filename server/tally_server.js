import express from "express";
import cors from "cors";
import tally_db from "./tally_db.js";
import tally_menu_routes from "./routes/tally_menu.js";

/*
Create express server to run for program.

Deafult port:       8255
*/

const tally_server = express();
const PORT = 8255;

tally_server.use(cors());
tally_server.use(express.json());

tally_server.use("/api/menu", tally_menu_routes);

/*
Initialize all tables
Obj:              Create all tables needed.

Tables:
menu              Acts like the main menu, displays all user created "scenarios"
scenario          Acts as the reference for user scenarios. Points to all selections.
selections        Acts as the reference for the user selections. Points back to scenario. 
sub_selections    If the user chooses, each selection can point to additional options. 
viewers           Stores data on viewers who engage with the streamer.
viewer_data       Stores scores and data that relate to scenarios. 
*/

function startTallyServer() {
  // Test to see if the database exists before starting server.
  try {
    const tally_server_result = tally_db
      .prepare("SELECT 1 AS database_ok")
      .get();

    if (tally_server_result.database_ok !== 1) {
      throw new Error("TALLY_DATABASE: Check for database has failed.");
    }

    // If we are here, then the database is found.
    console.log("TALLY_DATABASE: Database has been found.");

    // Tally server will open at port, or default to 3000
    tally_server.listen(PORT || 3000, () => {
      console.log(`TALLY_SERVER: Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error(
      `TALLY_SERVER: Failed to initialize database. Exiting : ${error}`,
    );
  }
}

startTallyServer();
