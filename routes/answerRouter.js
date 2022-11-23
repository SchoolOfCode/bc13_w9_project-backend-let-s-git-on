import {Router} from "express";  // import Router module

// import all the handle functions from player models. 
import {
    postAnswer, getAnswers, getAnswersById
} from "../models/answerMod.js"

const answerRouter = Router(); 


answerRouter.post ("/", async function (req, res){
    const body = req.body;
    const result = await postAnswer(body)
    res.json({success: true, payload: result})
    })

answerRouter.get("/", async function (req, res){
    //call the function getPlayer to get all the players
    const result = await getAnswers()
    //show result in the response object
    res.json({success: true, payload: result})
})

answerRouter.get("/:id", async function (req, res){
    //call the function getPlayer to get all the players
    const result = await getAnswersById(req.params.id)
    //show result in the response object
    res.json({success: true, payload: result})
})

export default answerRouter;