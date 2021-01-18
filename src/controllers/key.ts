import { Request, Response } from "express";
import {
  NotFoundResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  SuccessResponse,
  FailureMsgResponse,
  BadRequestResponse,
} from "../core/ApiResponse";
import Projects from "../database/models/projects.model";
import Keys from "../database/models/keys.model";
import User from "../database/models/user.model";
import Deadline from "../database/models/deadline.model";

class KeysController {
  fetchKey = async (req: Request, res: Response): Promise<void> => {
    const { keyName, token } = req.query;
    try {
      const projectScopedKey = Keys.scope({ method: ["projectKey", token] });
      const userScopedKey = Keys.scope({ method: ["userToken", token] });
      let results;
      results = await projectScopedKey.findOne({
        where: { keyName },
      });
      if (!results) {
        results = await userScopedKey.findOne({
          where: { keyName },
        });
        const deadLineScope = await Deadline.scope({
          method: ["isValidDeadline", results.project.projectId],
        }).findAll();
        if (deadLineScope.length === 0) {
          new ForbiddenResponse("You don't have access to this key!").send(res);
          return;
        }
        if (!results) {
          new NotFoundResponse("No such Key found!").send(res);
        }
      }
      if (
        this.isAuthorised(results?.project ?? results.user, token as string)
      ) {
        new SuccessResponse("Key Found!", results).send(res);
      } else {
        new ForbiddenResponse("You do not have access to this Key!").send(res);
      }
    } catch (error) {
      if (error.toString().includes("invalid input syntax for type uuid")) {
        new BadRequestResponse("Invalid Token").send(res);
        return;
      }
      console.log(error);
      new InternalErrorResponse("Cannot fetch the requested Key!").send(res);
    }
  };

  createKey = async (req: Request, res: Response): Promise<void> => {
    const { projectId, keyName, value, collaborators } = req.body;
    try {
      const newKey = await Keys.create({
        creatorId: req.user.id,
        projectId,
        keyName,
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
    const { token } = req.query;
    try {
      const projectScopedKey = Keys.scope({ method: ["projectKey", token] });
      const key = await projectScopedKey.findAll();
      if (key) {
        if (this.isAuthorised(key[0].project, token as string)) {
          const keyData: { [k: string]: any } = {};
          key.map((keys) => {
            keyData[keys.keyName] = keys.value;
            return keys;
          });
          new SuccessResponse("Key Found!", keyData).send(res);
        } else {
          new ForbiddenResponse("You do not have access to these keys!").send(
            res
          );
        }
      } else {
        new NotFoundResponse("No keys found for this project!").send(res);
      }
    } catch (error) {
      console.log(error);
      new InternalErrorResponse("Error fetching the requested keys!").send(res);
    }
  };

  isAuthorised = (project: Projects | User, token: string): boolean => {
    if (project.token === token) {
      return true;
    }
    return false;
  };
}
export default KeysController;
