import { Request, Response } from "express";
import uuid from "uuid-random";
import {
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
  FailureMsgResponse,
  ForbiddenResponse,
} from "../core/ApiResponse";
import Projects from "../database/models/projects.model";

class ProjectsController {
  fetchProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.query;
      const userId = req.user.id;
      const project = await Projects.findOne({ where: { projectId } });
      if (project) {
        if (userId === project.owner) {
          new SuccessResponse("Project Found!", project).send(res);
        } else if (
          project.collaborators != null &&
          project.collaborators.includes(`${userId}`)
        ) {
          new SuccessResponse("Project Found!", project).send(res);
        } else {
          new ForbiddenResponse("You do not have access to this Project!").send(
            res
          );
        }
      } else {
        new NotFoundResponse("No Project found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error fetching the requested Project!").send(
        res
      );
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, collaborators, organisation } = req.body;
      const generatedToken = uuid();
      const project = await Projects.create({
        token: generatedToken,
        owner: req.user.id,
        name,
        collaborators,
        organisation,
      });
      if (project) {
        new SuccessResponse("Project Created!", project).send(res);
      } else {
        new FailureMsgResponse("Cannot create Project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error creating this Project!").send(res);
    }
  };

  generateNewToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.body;
      const userId = req.user.id;
      const token = uuid();

      const projectUpdate = await Projects.update(
        { token },
        { where: { projectId, owner: userId } }
      );
      if (projectUpdate[0]) {
        new SuccessResponse("Project updated!", { token }).send(res);
      } else {
        new NotFoundResponse("No such Project found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error updating the Project!").send(res);
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId, collaborators } = req.body;
      const userId = req.user.id;
      const project = await Projects.update(
        {
          collaborators,
        },
        {
          where: { projectId, owner: userId },
        }
      );
      if (project[0]) {
        new SuccessResponse("Project Updated!", project).send(res);
      } else {
        new FailureMsgResponse("Cannot update this Project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error updating the Project!").send(res);
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.query;
      const userId = req.user.id;

      const project = await Projects.destroy({
        where: { projectId, owner: userId },
      });
      if (project) {
        new SuccessResponse("Project Deleted!", "").send(res);
      } else {
        new FailureMsgResponse("Cannot delete the Project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error deleting the Project!").send(res);
    }
  };
}

export default ProjectsController;
