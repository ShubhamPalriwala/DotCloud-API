import { Router } from "express";
import ProjectsController from "../controllers/projects";

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get("/", projectsController.fetchProject);
projectsRouter.put("/", projectsController.updateProject);
projectsRouter.post("/", projectsController.createProject);
projectsRouter.delete("/", projectsController.deleteProject);
projectsRouter.post("/generateToken", projectsController.generateNewToken);

export default projectsRouter;
