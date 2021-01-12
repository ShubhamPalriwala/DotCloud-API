import { Request, Response } from "express";
import organisations from "../database/models/organisation.model";

class organisationsController {
  fetchorganisation = async (req: Request, res: Response): Promise<void> => {
    const { organisationId } = req.query;
    try {
      const organisation = await organisations.findOne({
        where: { organisationId },
      });
      if (organisation) {
        res.send(organisation);
      } else {
        res.send("No organisations found");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  createorganisation = async (req: any, res: Response): Promise<void> => {
    try {
      const organisation = await organisations.create({
        ownerId: req.user.id,
        name: req.body.name,
        collaborators: req.body.collaborators,
      });
      if (organisation) {
        res.send(organisation);
      } else {
        res.send("organisation created!");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  updateorganisation = async (req: any, res: Response): Promise<void> => {
    try {
      const organisation = await organisations.update(
        {
          collaborators: req.body.collaborators,
        },
        {
          where: {
            organisationId: req.body.organisationId,
            ownerId: req.user.id,
          },
        }
      );
      if (organisation[0]) {
        res.send("organisation Updated!");
      } else {
        res.send("No organisations found");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };

  deleteorganisation = async (req: any, res: Response): Promise<void> => {
    try {
      const organisation = await organisations.destroy({
        where: {
          organisationId: req.body.organisationId,
          ownerId: req.user.id,
        },
      });
      if (organisation) {
        res.send("Deleted!");
      } else {
        res.send("unable to delete!");
      }
    } catch (error) {
      res.send(`Error due to ${error}`);
    }
  };
}

export default organisationsController;
