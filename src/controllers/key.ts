import { Request, Response } from "express";
import {
  NotFoundResponse,
  ForbiddenResponse,
  SuccessResponse,
  InternalErrorResponse,
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
          new ForbiddenResponse("You do not have access to this key").send(res);
        }
      } else {
        new NotFoundResponse("No such key found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
    }
  };

  createKey = async (req: Request, res: Response): Promise<void> => {
    try {
      const key = await Keys.create(req.body);
      if (key) {
        new SuccessResponse("Key Created!", key).send(res);
      }
      throw Error("Unwanted error!");
    } catch (error) {
      new InternalErrorResponse("Error creating the key!").send(res);
    }
  };

  updateKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId } = req.body;
    try {
      const key = await Keys.update(req.body, { where: { keyId } });
      if (key[0]) {
        new SuccessResponse("Key has been updated!", "").send(res);
      } else {
        new FailureMsgResponse("Key not updated!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error updating the key!").send(res);
    }
  };

  deleteKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId } = req.query;
    try {
      const key = await Keys.destroy({ where: { keyId } });
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
      const key = await Keys.findAll({ where: { projectId } });
      if (key) {
        res.send(
          this.isAuthorised(key[0].projectId, token as string)
            ? key
            : "Unauthorised"
        );
      } else {
        res.send("No keys found for project!");
      }
    } catch (error) {
      res.send("Error fetching project keys!");
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
