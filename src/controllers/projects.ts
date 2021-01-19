import { Request, Response } from "express";
import moment from "moment-timezone";
import uuid from "uuid-random";
import {
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
  FailureMsgResponse,
  ForbiddenResponse,
} from "../core/ApiResponse";
import Projects from "../database/models/projects.model";
import Deadline from "../database/models/deadline.model";

interface DeadlineInsertion {
  deadline: Date;
  user: number;
  projectId: number;
}

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
      const { name, collaborators, organisation, deadline } = req.body;
      const generatedToken = uuid();
      const project = await Projects.create({
        token: generatedToken,
        owner: req.user.id,
        name,
        collaborators,
        organisation,
      });
      if (deadline) {
        const deadlinesList: DeadlineInsertion[] = [];
        collaborators.map((colId: string) => {
          const creation: DeadlineInsertion = {
            user: parseInt(colId, 10),
            deadline: moment(new Date(deadline)).toDate(),
            projectId: project.projectId,
          };
          deadlinesList.push(creation);
          return collaborators;
        });
        const bulkDeadlineCreation = await Deadline.bulkCreate(deadlinesList, {
          returning: ["user"],
        });
        if (bulkDeadlineCreation.length === 0) {
          new FailureMsgResponse("Cannot update such collaborators").send(res);
          return;
        }
      }
      if (project) {
        new SuccessResponse("Project Created!", project).send(res);
      } else {
        new FailureMsgResponse("Cannot create Project!").send(res);
      }
    } catch (error) {
      if (
        error
          .toString()
          .includes("SequelizeForeignKeyConstraintError: insert or update")
      ) {
        new NotFoundResponse("No such user found!").send(res);
        return;
      }
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
      const { projectId, collaborators, deadline } = req.body;
      const userId = req.user.id;
      const project = await Projects.update(
        {
          collaborators,
        },
        {
          where: { projectId, owner: userId },
        }
      );
      if (deadline) {
        const deadlinesList: DeadlineInsertion[] = [];
        collaborators.map((colId: string) => {
          const creation: DeadlineInsertion = {
            user: parseInt(colId, 10),
            deadline: moment(new Date(deadline)).toDate(),
            projectId,
          };
          deadlinesList.push(creation);
          return collaborators;
        });
        const bulkDeadlineCreation = await Deadline.bulkCreate(deadlinesList, {
          returning: ["user"],
        });
        if (bulkDeadlineCreation.length === 0) {
          new FailureMsgResponse("Cannot update such collaborators").send(res);
          return;
        }
      }
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
