//import node-postgress package for interfacing with postgreSQL database
import pkg from 'pg'; 

/** set up a pool instance with configuration to online database, this manages connections for us */
const { Pool } = pkg;
export const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL,
});

/** 
*  export query function - to be used by handle functions in 'models'. 
*  pool.query runs a single query to the database. This lets our JS function send SQL readable queries. 
*/
export function query(text, params) {
  return pool.query(text, params);
}