import { query } from "../db/index.js"
/**A simple function to get all questions - used for next sprint. 
 * 
 * @returns An array of all questions.
 */
async function getQs () {
    console.log ("Got to getQs!")
    const questions = await query (
        `SELECT * FROM questions
        JOIN multiple_choices
        ON questions.question_id = multiple_choices.question_id;`
    );
    return questions.rows
   
}

/**This gets us a specific question by ID. Not currently in use.
 * 
 * @param {number} id This is the ID from the request parameters as usual.
 * @returns Gives us the specific question.
 */
async function getQbyID (id) {

    const response = await query (
     `SELECT * FROM questions
     WHERE question_id = $1`, [id]);
    return response.rows;}



/**This gets us the question and its linked answers from the DB.
 * 
 * @param {number} question_id Gets the ID from the req params
 * @returns returns an array with the question and it's choices.
 */
async function getMultipChoice(question_id){

    const response = await query(
        `SELECT questions.question, multiple_choices.choices
        FROM questions
        INNER JOIN multiple_choices ON questions.question_id = multiple_choices.question_id
        WHERE questions.question_id = $1`, [question_id]);
    return response.rows;
}

    
export { getQs, getQbyID, getMultipChoice} ;