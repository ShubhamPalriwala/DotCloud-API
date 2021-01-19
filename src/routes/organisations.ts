import { Router } from "express";
import OrganisationController from "../controllers/organisation";
import schemas from "../middleware/schemas";
import validator from "../middleware/validation";

const organisationRouter = Router();
const organisationsController = new OrganisationController();

organisationRouter.get("/", organisationsController.fetchorganisation);
organisationRouter.post(
  "/",
  validator(schemas.createOrg),
  organisationsController.createorganisation
);

organisationRouter.put(
  "/",
  validator(schemas.updateOrg),
  organisationsController.updateorganisation
);

organisationRouter.delete("/", organisationsController.deleteorganisation);

export default organisationRouter;
