import { query } from "../db/index.js"

async function getQs () {
    console.log ("Got to getQs!")
    const questions = await query (
        `SELECT * FROM players`
    );
    return questions.rows
   
}

export { getQs } ;