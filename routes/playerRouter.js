import {Router} from "express";  // import Router module

// import all the handle functions from player models. 
import {
    getPlayer,
    getPlayerbyID,
    addPlayer,
    deletePlayer
} from "../models/playerMods.js"

const playerRouter = Router(); 

//handles GET request for all players. 
playerRouter.get("/", async function (req, res){
    //call the function getPlayer to get all the players
    const result = await getPlayer()
    //show result in the response object
    res.json({success: true, payload: result})
})

//handles GET request for a player by ID
playerRouter.get("/:id", async function (req,res){
    //call the function getPlayerbyID
    const result = await getPlayerbyID(req.params.id)
    //show result in the response object
    res.json({success: true, payload: result})
})

//handles POST request to add a player 
playerRouter.post("/", async function(req,res){
    //get the request body that contains an object with key nickname
    const newPlayer = req.body.nickname;
    //call the function to add player
    const result = await addPlayer(newPlayer)
    //show result in the response object
    res.json({success: true, message: "A new player is added", payload: result})
})

//handles DELETE request to delete a player 
playerRouter.delete("/:id", async function (req,res){
    //call the function delete player function
    //and pass in req.params.id as argument
    const deletedPlayer = await deletePlayer(req.params.id)
    //show deleted player in the response object
    res.json({success: true, message: "This player has been deleted", payload: deletedPlayer})
}) 


export default playerRouter
