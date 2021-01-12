import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "./database";
import projectsRouter from "./routes/projects";
import keysRouter from "./routes/key";

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(morgan("tiny"));

app.use(projectsRouter);
app.use(keysRouter);

export default app;
