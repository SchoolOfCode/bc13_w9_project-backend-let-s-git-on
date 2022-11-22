import express from "express";
import morgan from "morgan";
const app = express();
const PORT = process.env.port;

app.use(morgan("dev"))


app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, function () {
    console.log(`The server LIVES - on Port ${PORT}`);
  });
  