import {Router} from "express";
import {
    getPlayer,
    getPlayerbyID
} from "../models/playerMods.js"

const playerRouter = Router();

playerRouter.get("/", async function (req, res){
    //call the function getPlayer to get all the players
    const result = await getPlayer()
    res.json({success: true, payload: result})
})

playerRouter.get("/:id", async function (req,res){
    const result = await getPlayerbyID(req.params.id)
    res.json({success: true, payload: result})

})


export default playerRouter
