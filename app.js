import express from "express";  //import express server package
import morgan from "morgan";  //import morgan package
import cors from 'cors'; // import cors package 

//load router modules from their path
import questionRouter from "./routes/questionRouter.js" 
import playerRouter from "./routes/playerRouter.js"


const app = express();
const PORT = process.env.port || 3000;

//middleware
app.use(morgan("dev")); //use morgan to show request logs in real time. 
app.use(express.json()); 
app.use(cors()); //enable all Cross-Origin Resource Sharing (CORS) request 

//middleware to send requests to router modules. 
app.use("/api/questions", questionRouter);
app.use("/api/players", playerRouter);

//attaching server to a PORT specified above.
app.listen(PORT, function () {
    console.log(`The server LIVES - on Port ${PORT}`);
  });
  