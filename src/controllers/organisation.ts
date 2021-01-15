import { Request, Response } from "express";
import {
  SuccessResponse,
  NotFoundResponse,
  InternalErrorResponse,
  FailureMsgResponse,
} from "../core/ApiResponse";
import organisations from "../database/models/organisation.model";

class organisationsController {
  fetchorganisation = async (req: Request, res: Response): Promise<void> => {
    const { organisationId } = req.query;
    try {
      const organisation = await organisations.findOne({
        where: { organisationId },
      });
      if (organisation) {
        new SuccessResponse("Organisation Found!", organisation).send(res);
      } else {
        new NotFoundResponse("No such Organisation found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error fetching the requested key!").send(res);
    }
  };

  createorganisation = async (req: Request, res: Response): Promise<void> => {
    const { name, collaborators } = req.body;
    try {
      const organisation = await organisations.create({
        ownerId: req.user.id,
        name,
        collaborators,
      });
      if (organisation) {
        new SuccessResponse("Organisation created!", organisation).send(res);
      } else {
        new FailureMsgResponse("Unable to create Organisation!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error creating the Organisation!").send(res);
    }
  };

  updateorganisation = async (req: Request, res: Response): Promise<void> => {
    const { collaborators, organisationId } = req.body;
    try {
      const organisation = await organisations.update(
        {
          collaborators,
        },
        {
          where: {
            organisationId,
            ownerId: req.user.id,
          },
        }
      );
      if (organisation[0]) {
        new SuccessResponse("Organisation updated!", "").send(res);
      } else {
        new NotFoundResponse("No such Organisation found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error updating the organisation!").send(res);
    }
  };

  deleteorganisation = async (req: Request, res: Response): Promise<void> => {
    const { organisationId } = req.query;
    try {
      const organisation = await organisations.destroy({
        where: {
          organisationId,
          ownerId: req.user.id,
        },
      });
      if (organisation) {
        new SuccessResponse("Organisation Deleted!", "").send(res);
      } else {
        new FailureMsgResponse("Unable to delete Organisation!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Error deleting the Organisation!").send(res);
    }
  };
}

export default organisationsController;
