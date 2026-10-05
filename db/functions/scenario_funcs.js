// --- Tally :: Scenario Functions --- //

import { db, tally_db } from "../db.js";

/*
:: CREATE A SCENARIO ::

obj:
    Create a new scenario that will be displayed in the main menu. Name shall follow proper validation. 

params: 
    None.
*/
export async function createScenario(key) {
  await tally_db;

  const existingScenario = await db.query(
    "SELECT * FROM scenario WHERE key = $1 LIMIT 1;",
    [key],
  );

  if (existingScenario.rows.length > 0) {
    console.log("DB: Has the same name");
    return existingScenario.rows[0];
  }

  const result = await db.query("INSERT INTO ");
}

/*
:: READ (DISPLAY) A SCENARIO ::

obj:
    Shows a new scenario that will be displayed in the main menu. 

params: 
    id: id of the scenario.

returns: 
    Table with that value of the id.
*/
export async function showScenario() {}

/*
:: UPDATE A SCENARIO ::

obj:
    Takes in paramters id and modifies the name (for scenario). 

params: 
    id: id of the scenario.

returns: 
    Changes the name of the scenario
*/
export async function updateScenario() {}

/*
:: DELETE A SCENARIO ::

obj:
    Takes in paramters id and deletes the scenario
params: 
    id: id of the scenario.

returns: 
    Removes the name of the scenario
*/
export async function deleteScenario() {}
