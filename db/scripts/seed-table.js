import { seedAllTables } from "../helpers.js";
import { pool } from "../index.js";

try {
  await seedAllTables();
  console.log("Seeded all tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
