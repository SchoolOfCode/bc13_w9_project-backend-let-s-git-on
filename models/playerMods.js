import {query} from "../db/index.js"

async function getPlayer(){
    //get all player
    const player = await query('SELECT * from players');
    return player.rows;
}

async function getPlayerbyID(id){
    //get one player by ID and the responses. 
    //combine table player and answer where player ID matches
    const response = await query(`SELECT players.nickname, questions.question, answers.answer 
    FROM players 
    INNER JOIN answers ON players.player_id = answers.player 
    INNER JOIN questions ON questions.question_id = answers.question
    WHERE players.player_id = $1`,[id]);
    return response.rows;
}

export {
    getPlayer,
    getPlayerbyID
};