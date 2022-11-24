//The functions below will reset all tables back to the original schema

import {pool} from "./index.js";

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
        'Imagine you are in a jungle and you have to choose one of these animals to get to freedom, which one do you choose?'
      ),
      (
        'Which do you think is the most overrated?'
      ),
      (
        'What is something you dont get the hype over?'
      ),
      (
        'Pick a superpower but there might be a twist!'
      ),
      (
      'Who would you choose to fight alongside you in a zombie apocalypse?'
      )
      ;
      
      INSERT INTO multiple_choices (question_id, choices)
      VALUES
      (1, 'Gorilla'),
      (1, 'Bear'),
      (1, 'Wolf'),
      (1, 'Anaconda'),
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
      (4, 'Super strength but you are also super sticky'),
      (4, 'X-ray vision but you lose your clothes when you use it'),
      (4, 'Super stretchy but you are also super slimy'),
      (4, 'Shape shifter but you only turn into bugs'),
      
      (5, 'Liz'),
      (5, 'Arshi'),
      (5, 'Hamza'),
      (5, 'Jordan'),
      (5, 'Loz'),
      (5, 'Jessica');
      
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
      (3,5,27);`
    );
  }
  
