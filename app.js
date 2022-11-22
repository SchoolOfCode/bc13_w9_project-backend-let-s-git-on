import express from "express";
import morgan from "morgan";
const app = express();
const PORT = process.env.port || 3000;

import questionRouter from "./routes/questionRouter.js"
import playerRouter from "./routes/playerRouter.js"

app.use(morgan("dev"))



app.use(express.static("public"));
app.use(express.json());
app.use("/api/questions", questionRouter);
app.use("/api/players", playerRouter);

app.listen(PORT, function () {
    console.log(`The server LIVES - on Port ${PORT}`);
  });
  