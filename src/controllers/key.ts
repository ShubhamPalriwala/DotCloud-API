import { Request, Response } from "express";
import {
  NotFoundResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  SuccessResponse,
  FailureMsgResponse,
} from "../core/ApiResponse";
import Projects from "../database/models/projects.model";
import Keys from "../database/models/keys.model";

class KeysController {
  fetchKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId, token } = req.query;
    try {
      const key = await Keys.findOne({
        include: [Projects],
        where: { keyId },
      });
      if (key) {
        if (this.isAuthorised(key.project, token as string)) {
          new SuccessResponse("Key Found!", key).send(res);
        } else {
          new ForbiddenResponse("You do not have access to this Key!").send(
            res
          );
        }
      } else {
        new NotFoundResponse("No such Key found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested Key!").send(res);
    }
  };

  createKey = async (req: Request, res: Response): Promise<void> => {
    const { projectId, key, value, collaborators } = req.body;
    try {
      const newKey = await Keys.create({
        creatorId: req.user.id,
        projectId,
        key,
        value,
        collaborators,
      });
      if (newKey) {
        new SuccessResponse("Key Created!", newKey).send(res);
        return;
      }
      throw Error("Unwanted error!");
    } catch (error) {
      new InternalErrorResponse("Error creating the key!").send(res);
    }
  };

  updateKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId, value } = req.body;
    try {
      const key = await Keys.update(
        {
          value,
        },
        {
          where: { keyId, creatorId: req.user.id },
        }
      );
      if (key[0]) {
        new SuccessResponse("Key has been updated!", "").send(res);
      } else {
        new FailureMsgResponse("Key could not be updated!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error updating the key!").send(res);
    }
  };

  deleteKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId } = req.query;
    try {
      const key = await Keys.destroy({
        where: { keyId, creatorId: req.user.id },
      });
      if (key) {
        new SuccessResponse("Key has been deleted!", "").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error deleting the key!").send(res);
    }
  };

  fetchProjectKeys = async (req: Request, res: Response): Promise<void> => {
    const { projectId, token } = req.query;
    try {
      const key = await Keys.findAll({
        include: [Projects],
        where: { projectId },
      });
      if (key) {
        if (this.isAuthorised(key[0].project, token as string)) {
          new SuccessResponse("Key Found!", key).send(res);
        } else {
          new ForbiddenResponse("You do not have access to these keys!").send(
            res
          );
        }
      } else {
        new NotFoundResponse("No keys found for this project!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error fetching the requested keys!").send(res);
    }
  };

  isAuthorised = (project: Projects, token: string): boolean => {
    if (project.token === token) {
      return true;
    }
    return false;
  };
}
export default KeysController;
