//import node-postgress package for interfacing with postgreSQL database
import pkg from 'pg'; 

//set up a pool instance with configuration to online database
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL,
});

//export query function - to be used by handle functions in 'models'. 
//pool.query runs a single query to the database.
export function query(text, params) {
  return pool.query(text, params);
}