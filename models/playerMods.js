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
    const response = await query(`SELECT players.nickname, questions.question, multiple_choices.choices
    FROM players 
    INNER JOIN answers ON players.player_id = answers.player 
    INNER JOIN questions ON questions.question_id = answers.question
    INNER JOIN multiple_choices ON multiple_choices.choice_id = answers.choices 
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


export async function createAllTables() {
    return await pool.query(
      `CREATE TABLE IF NOT EXISTS players (
        player_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        nickname VARCHAR(15) NOT NULL
      );
      
      CREATE TABLE questions(
        question_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        question TEXT
      );
      
    
    CREATE TABLE multiple_choices(
    choice_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      question_id INTEGER REFERENCES questions(question_id),
      choices TEXT
      );
    
    CREATE TABLE answers(
        ans_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      player INTEGER REFERENCES players(player_id),
      question INTEGER REFERENCES questions(question_id),
     choices INTEGER REFERENCES multiple_choices(choice_id)
           );
    `
    );
  }
  export async function dropAllTables() {
    return await pool.query("DROP TABLE IF EXISTS players, questions, multiple_choices, answers;");
  }
  export async function resetAllTables() {
    return [
      await dropAllTables(),
      await createAllTables(),
      await seedAllTables(),
    ];
  }
  export async function seedAllTables() {
    return await pool.query(
      `INSERT INTO players (nickname)
      VALUES 
      (
        'player 1'
      ),
      (
        'player 2'
      ),
      (
        'player 3'
      );
      
      INSERT INTO questions (question)
      VALUES
      (
        'Imagine you are in a jungle and you have to choose one of these animals to fight to get to freedom - which one would you choose?'
      ),
      (
        'Which is the most overrated?'
      ),
      (
        'What is something you dont get the hype over?'
      ),
      (
        'Pick a superpower - but there is a twist!'
      ),
      (
      'Who would you choose to fight alongside you in a zombie apocalypse?'
      )
      ;
      
      INSERT INTO multiple_choices (question_id, choices)
      VALUES
      (1, 'Gorilla'),
      (1, 'Bear'),
      (1, 'Worlf'),
      (1, 'Venomous snake'),
      (1, 'Rhino'),
      (1, 'Kangaroo'),
      
      (2, 'Social Media'),
      (2, 'Dogs and Cats'),
      (2, 'Chocolate'),
      (2, 'Capital Cities'),
      (2, 'Netflix'),
      (2, 'Anime'),
      
      (3, 'React'),
      (3, 'JavaScript'),
      (3, 'SQL'),
      (3, 'Testing'),
      (3, 'CSS'),
      (3, 'UX/UI'),
      
      (4, 'Invisibility but you smell like sewage'),
      (4, 'Flying but you constantly need the loo'),
      (4, 'Super strength but super sticky also'),
      (4, 'X-ray vision but you lose your clothes when you use it'),
      (4, 'Super stretchy but super slimy also'),
      (4, 'Shape shifter but you only turn into bugs'),
      
      (5, 'Liz'),
      (5, 'Arshi'),
      (5, 'Hamza'),
      (5, 'Jordan'),
      (5, 'Loz'),
      (5, 'Jessica')
      
      INSERT INTO answers (player, question, choices)
      VALUES 
      (1,1,1),
      (1,2,7),
      (1,3,14),
      (1,4,20),
      (1,5,27),
      
      (2,1,6),
      (2,2,12),
      (2,3,18),
      (2,4,24),
      (2,5,30),
      
      (3,1,5),
      (3,2,10),
      (3,3,15),
      (3,4,22),
      (3,5,27);`,
      [JSON.stringify(seedData)]
    );
  }
  