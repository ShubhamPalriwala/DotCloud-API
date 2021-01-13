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
        new NotFoundResponse("No such rganisation found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot fetch the requested key").send(res);
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
        new SuccessResponse("Organisation created!", organisation).send(res);
      } else {
        new FailureMsgResponse("Unable to create organisation").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot create the organisation").send(res);
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
        new SuccessResponse("Organisation updated!", "").send(res);
      } else {
        new NotFoundResponse("No such organisation found!").send(res);
      }
    } catch (error) {
      new InternalErrorResponse(
        "Cannot udpate the requested organisation"
      ).send(res);
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
        new SuccessResponse("Organisation Deleted!", "").send(res);
      } else {
        new FailureMsgResponse("Unable to delete organisation").send(res);
      }
    } catch (error) {
      new InternalErrorResponse("Cannot delete the request organisation").send(
        res
      );
    }
  };
}

export default organisationsController;
