import { Router } from "express";
import ProjectsController from "../controllers/projects";

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get("/projects", projectsController.fetchProject);
projectsRouter.put("/projects", projectsController.updateProject);
projectsRouter.post("/projects", projectsController.createProject);
projectsRouter.delete("/projects", projectsController.deleteProject);

export default projectsRouter;
