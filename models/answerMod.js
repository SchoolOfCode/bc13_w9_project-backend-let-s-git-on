import { query } from "../db/index.js"


/**
 * This function injects an SQL query to the DB containing the player's answers to the questions, linked to their ID.
 * 
 * @param {Object} body  This is the object sent from the frontend to our API. This contains the playerID, question and answer.
 * @returns {string} This returns the player id, their answer choices and linked questions which were posted to the DB.
 */
async function postAnswer(body) {
   const inserted = await query (`INSERT INTO answers (player, question, choices) VALUES ($1, $2, $3) RETURNING *`, [body.playerID, body.question, body.answer])
   return inserted.rows;
}
/**
 * @returns This returns all answers from our DB - mainly for debugging purposes.
 */
async function getAnswers () {
    const questions = await query (
        `SELECT * FROM answers`
    );
    return questions.rows
}


/** Find questions by id - mainly for debugging purposesz.
 * @param {number} id this is the ID sent from the request parameter.
 * @returns Returns the found question ID,
 */
async function getAnswersById(id) {
    const questions = await query (
        `SELECT * FROM answers WHERE player = $1`, [id]
    );
    return questions.rows
}

export {postAnswer, getAnswers, getAnswersById} ;