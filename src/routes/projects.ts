import { Router } from "express";
import ProjectsController from "../controllers/projects";
import schemas from "../middleware/schemas";
import validator from "../middleware/validation";

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get("/", projectsController.fetchProject);
projectsRouter.put(
  "/",
  validator(schemas.updateProject),
  projectsController.updateProject
);
projectsRouter.post(
  "/",
  validator(schemas.createProject),
  projectsController.createProject
);
projectsRouter.delete("/", projectsController.deleteProject);
projectsRouter.post(
  "/generateToken",
  validator(schemas.newToken),
  projectsController.generateNewToken
);

export default projectsRouter;
