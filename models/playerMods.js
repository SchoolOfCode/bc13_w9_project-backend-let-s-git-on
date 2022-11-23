//load query function from db path
import {query} from "../db/index.js"

//function to get all players
async function getPlayer(){
    //query the db to select all from players table
    const player = await query('SELECT * from players');
    return player.rows;
}

//function to get a specific player by its ID and its answers. 
async function getPlayerbyID(id){
    //query the dattabase to combine players, questions, and answers table where player ID matches,
    //and return the player's nickname, questions, and the respective answers.
    console.log ('searching for player function')
    const response = await query(`SELECT players.nickname, questions.question, answers.answer 
    FROM players 
    INNER JOIN answers ON players.player_id = answers.player 
    INNER JOIN questions ON questions.question_id = answers.question
    WHERE players.player_id = $1`,[id]);
    return response.rows;
}

//function to add a player (POST request)
async function addPlayer(nickname){
    //query the database to add a player into the player table and return the newly added player
    const player = await query(`INSERT INTO players (nickname)
    VALUES ($1)
    RETURNING *`, [nickname]);
    return player.rows; 
}

//function to delete a player by its ID
async function deletePlayer(id){
    //query the db to delete a player from the player table
    const player = await query(`DELETE FROM players
    WHERE player_id = $1
    RETURNING *`, [id]);
    return player.rows
}

//export all the model functions, to be used by the route handlers
export {
    getPlayer,
    getPlayerbyID,
    addPlayer,
    deletePlayer
};