import Database from "better-sqlite3";

/*
Create the database for this program.
Will make it in the same folder as the program.

Default name:       tally-db.js

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
const tally_db = new Database("tally_db.sqlite");

/*
table:              main
obj:                Store all of the scenarios that the user creates

-----
id:                 id value for targeting
name:               user defined
created_at:         date of when created
last_accessed_at    date of when last accesed  
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS main (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`);

/*
table:              scenario
obj:                Store all of the selections created by user

-----
id:                 id value for targeting
name:               user defined
created_at:         date of when created
last_accessed_at    date of when last accesed  
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS scenario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        scenario_id INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (scenario_id) REFERENCES main (id) ON DELETE CASCADE
    );
`);

/*
table:              selections
obj:                Store all of the options created by user

-----
id:                 id value for targeting
name:               user defined
created_at:         date of when created
last_accessed_at    date of when last accesed  
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS selections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        selection_id INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (selection_id) REFERENCES scenario (id) ON DELETE CASCADE
    );
`);

/*
table:              sub_selections
obj:                Store additional options created for each selection

-----
id:                 id value for targeting
name:               user defined
selection_id:       selection that owns this sub-selection
created_at:         date of when created
last_accessed_at    date of when last accesed
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS sub_selections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        selection_id INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (selection_id) REFERENCES selections (id) ON DELETE CASCADE
    );
`);

/*
table:              viewers
obj:                Store viewers who engage with the streamer

-----
id:                 id value for targeting
name:               user defined
created_at:         date of when created
last_accessed_at    date of when last accesed
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS viewers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`);

/*
table:              viewer_data
obj:                Store viewer scores and data related to scenarios

-----
id:                 id value for targeting
viewer_id:          viewer associated with the data
scenario_id:        scenario associated with the data
score:              viewer score for the scenario
created_at:         date of when created
last_accessed_at    date of when last accesed
*/
tally_db.exec(`
    CREATE TABLE IF NOT EXISTS viewer_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        viewer_id INTEGER NOT NULL,
        scenario_id INTEGER NOT NULL,
        score INTEGER,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_accessed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (viewer_id) REFERENCES viewers (id) ON DELETE CASCADE,
        FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE
    );
`);

export default tally_db;
