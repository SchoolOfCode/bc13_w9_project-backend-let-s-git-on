import { Router } from "express";
const router = Router();
import { getQs } from "../models/questionMods.js"

router.get ("/questions", async function (req, res){
console.log ("Got to QRouter!")
const result = await getQs()
res.json({success: true, payload: result})
})


export default router