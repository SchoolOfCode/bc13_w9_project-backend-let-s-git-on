import { Router } from "express";
const questionRouter = Router();
import { getQs, getQbyID } from "../models/questionMods.js"


questionRouter.get ("/", async function (req, res){
console.log ("Got to QRouter!")
const result = await getQs()
res.json({success: true, payload: result})
})

questionRouter.get("/:id", async function (req, res) {
    console.log ("got to QsearchRouter")
    //call the function getQbyID when this route is used
    const result = await getQbyID(req.params.id)
    // show result in the response object
    res.json({success: true, payload: result})
    })


export default questionRouter