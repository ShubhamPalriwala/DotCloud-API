import express from "express";
import projectsRouter from "./routes/projects";
import "./database";

const app = express();
const port = process.env.PORT || "8000";

app.use(projectsRouter);

app.get("/", (req, res) => {
  res.send("Up and running 😎");
});

app.listen(port, () => console.log(`server is listening on ${port}`));
