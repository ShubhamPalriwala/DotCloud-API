import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import "./database";
import passport from "passport";
import projectsRouter from "./routes/projects";
import keysRouter from "./routes/key";
import userRouter from "./routes/user";
import organisationRouter from "./routes/organisations";

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
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Up and running 😎");
});

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

app.use("/user", userRouter);
app.use("/projects", userAuthMiddleware, projectsRouter);
app.use("/organisation", userAuthMiddleware, organisationRouter);
app.use("/keys", keysRouter);

export default app;
