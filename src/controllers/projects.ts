import { Request, Response } from "express";
import {
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
  FailureMsgResponse,
} from "../core/ApiResponse";
import Projects from "../database/models/projects.model";

class ProjectsController {
  fetchProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
      const project = await Projects.findOne({ where: { projectId } });
      if (project) {
        new SuccessResponse("Project Found!", project).send(res);
      } else {
        new NotFoundResponse("No Project found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const project = await Projects.create(req.body);
      if (project) {
        new SuccessResponse("Project Created", project).send(res);
      } else {
        new FailureMsgResponse("Cannot create project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.body;
    try {
      const project = await Projects.update(req.body, {
        where: { projectId },
      });
      if (project[0]) {
        new SuccessResponse("Project Updated", project).send(res);
      } else {
        new FailureMsgResponse("Cannot update this project").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
      const project = await Projects.destroy({ where: { projectId } });
      if (project) {
        new SuccessResponse("Project Deleted!", "").send(res);
      } else {
        new FailureMsgResponse("Unable to delte the project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
    }
  };
}

export default ProjectsController;
