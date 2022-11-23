import {createAllTables} from "../helpers.js"
import {pool} from "../index.js"

try {
    await createAllTables();
    console.log("Created all tables");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }