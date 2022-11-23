import { query } from "../db/index.js"

async function getQs () {
    console.log ("Got to getQs!")
    const questions = await query (
        `SELECT * FROM questions`
    );
    return questions.rows
   
}


//function to get a specific question only
async function getQbyID (id) {
    //query the database to find the question by ID
    const response = await query (
     `SELECT * FROM questions
     WHERE question_id = $1`, [id]);
    return response.rows;}


//function to show multiple choice options based on Question ID
async function getMultipChoice(question_id){
    //query the database to get all choices where questions_id matches
    //return the questions and the multiple choices
    const response = await query(
        `SELECT questions.question, multiple_choices.choices
        FROM questions
        INNER JOIN multiple_choices ON questions.question_id = multiple_choices.question_id
        WHERE questions.question_id = $1`, [question_id]);
    return response.rows;
}

    
export { getQs, getQbyID, getMultipChoice} ;