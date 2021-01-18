import { Router } from "express";
import OrganisationController from "../controllers/organisation";

const organisationRouter = Router();
const organisationsController = new OrganisationController();

organisationRouter.get("/", organisationsController.fetchorganisation);
organisationRouter.post("/", organisationsController.createorganisation);

organisationRouter.put("/", organisationsController.updateorganisation);

organisationRouter.delete("/", organisationsController.deleteorganisation);

export default organisationRouter;
