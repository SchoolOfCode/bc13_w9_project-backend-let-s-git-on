import { query } from "../db/index.js"

async function postAnswer(body) {
   const inserted = await query (`INSERT INTO answers (player, question, choices) VALUES ($1, $2, $3) RETURNING *`, [body.playerID, body.question, body.answer])
   return inserted.rows;
}

async function getAnswers () {
    const questions = await query (
        `SELECT * FROM answers`
    );
    return questions.rows
}

async function getAnswersById(id) {
    const questions = await query (
        `SELECT * FROM answers WHERE player = $1`, [id]
    );
    return questions.rows
}

export {postAnswer, getAnswers, getAnswersById} ;