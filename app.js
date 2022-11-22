import express from "express";
import morgan from "morgan";
const app = express();
const PORT = process.env.port;

app.use(morgan("dev"))

import questionRouter from "./routes/questionRouter.js"

app.use(express.static("public"));
app.use(express.json());
app.use("/api", questionRouter);


app.listen(PORT, function () {
    console.log(`The server LIVES - on Port ${PORT}`);
  });
  