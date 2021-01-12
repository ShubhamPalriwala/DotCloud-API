import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "./database";
import passport from "passport";
import projectsRouter from "./routes/projects";
import keysRouter from "./routes/key";
import userRouter from "./routes/user";

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
app.use(express.json());
app.use(passport.initialize());
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Up and running 😎");
});
app.use("/user", userRouter);
app.use(projectsRouter);
app.use(keysRouter);

export default app;
