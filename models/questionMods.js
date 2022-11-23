import { query } from "../db/index.js"

async function getQs () {
    console.log ("Got to getQs!")
    const questions = await query (
        `SELECT * FROM questions`
    );
    return questions.rows
   
}

async function getQbyID (id) {
    //query the database to find the question by ID
    const response = await query (
     `SELECT * FROM questions
     WHERE question_id = $1`, [id]);
    return response.rows;}
    
    export { getQs, getQbyID} ;

//function to show multiple choice options based on Question ID