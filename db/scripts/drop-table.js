import { dropAllTables } from "../helpers.js";
import { pool } from "../index.js";

try {
  await dropAllTables();
  console.log("Dropped all tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
