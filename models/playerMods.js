//load query function from db path
import {query} from "../db/index.js"

//function to get all players

   
/**Query the db to select all players from the players table.
 * @returns Returns the selected players.
 */
async function getPlayer(){

    const player = await query('SELECT * from players');
    return player.rows;
}

//function to get a specific player by its ID and its answers. 
/**Queries the database to combine the player, the questions, and their answers. 
 * 
 * @param {number} id This is the ID of the player we're looking for, taken from the request parameters.
 * @returns Gets us an object with a payload of an array with our player's answers to questions in it.
 */
async function getPlayerbyID(id){
    console.log ('searching for player function')
    const response = await query(`SELECT players.nickname, questions.question, multiple_choices.choices
    FROM players 
    INNER JOIN answers ON players.player_id = answers.player 
    INNER JOIN questions ON questions.question_id = answers.question
    INNER JOIN multiple_choices ON multiple_choices.choice_id = answers.choices 
    WHERE players.player_id = $1`,[id]);
    return response.rows;
}

/**Adds a new player to the aatabase.
 * 
 * @param {string} nickname This is the player name sent from the front-end via our API.
 * @returns This returns our newly added player nickname.
 */
async function addPlayer(nickname){
    const player = await query(`INSERT INTO players (nickname)
    VALUES ($1)
    RETURNING *`, [nickname]);
    return player.rows; 
}

//function to delete a player by its ID

/**Deletes a player from the database by ID. Currently does not have functionality if player ID is not found. 
 * 
 * @param {*} id This is the ID from the request parameters.
 * @returns Returns the successfully deleted player.
 */
async function deletePlayer(id){

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


