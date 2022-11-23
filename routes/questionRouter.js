import { Router } from "express";
const questionRouter = Router();
import { getQs } from "../models/questionMods.js"


questionRouter.get ("/questions", async function (req, res){

console.log ("Got to QRouter!")
const result = await getQs()
res.json({success: true, payload: result})
})

questionRouter.get("/questions/:id")


export default questionRouter