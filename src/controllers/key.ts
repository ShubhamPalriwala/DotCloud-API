import { Response, Request } from "express";
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
        res.send(
          this.isAuthorised(key.project, token as string) ? key : "Unauthorised"
        );
      } else {
        res.send("No such key found!");
      }
    } catch (error) {
      res.send("Error fetching key");
    }
  };

  createKey = async (req: Request, res: Response): Promise<void> => {
    try {
      const key = await Keys.create(req.body);
      if (key) {
        res.send("Key Created");
      }
    } catch (error) {
      res.send("Error fetching key");
    }
  };

  updateKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId } = req.body;
    try {
      const key = await Keys.update(req.body, { where: { keyId } });
      if (key[0]) {
        res.send("Key updated!");
      } else {
        res.send("Key not updated");
      }
    } catch (error) {
      res.send("Error updating key");
    }
  };

  deleteKey = async (req: Request, res: Response): Promise<void> => {
    const { keyId } = req.query;
    try {
      const key = await Keys.destroy({ where: { keyId } });
      if (key) {
        res.send("Key deleted!");
      }
    } catch (error) {
      res.send("Error updating key");
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
