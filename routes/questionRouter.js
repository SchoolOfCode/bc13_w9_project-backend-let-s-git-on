import { Router } from "express";
const router = Router();

router.get ("/questions", async function (req, res){
console.log ("Got to QRouter!")

})


export default router