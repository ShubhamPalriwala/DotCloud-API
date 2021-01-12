import { Request, Response } from "express";
import Projects from "../database/models/projects.model";

class ProjectsController {
  fetchProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
      const project = await Projects.findOne({ where: { projectId } });
      if (project) {
        res.send(project);
      } else {
        res.send("No projects found");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const project = await Projects.create(req.body);
      if (project) {
        res.send(project);
      } else {
        res.send("Project created!");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.body;
    try {
      const project = await Projects.update(req.body, {
        where: { projectId },
      });
      if (project[0]) {
        res.send("Project Updated!");
      } else {
        res.send("No projects found");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
      const project = await Projects.destroy({ where: { projectId } });
      if (project) {
        res.send("Deleted!");
      } else {
        res.send("unable to delete!");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };
}

export default ProjectsController;
