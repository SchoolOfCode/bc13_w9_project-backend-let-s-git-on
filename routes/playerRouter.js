import {Router} from "express";
import {
    getPlayer,
    getPlayerbyID
} from "../models/playerMods.js"

const playerRouter = Router();

playerRouter.get("/", async function (req, res){
    console.log("get all players")
    //res.json("GOT TO THE PLAYER ROUTER")
    const result = await getPlayer()
    res.json({success: true, payload: result})
})


export default playerRouter
