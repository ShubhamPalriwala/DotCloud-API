import { Router } from "express";
import passport from "passport";
import OrganisationController from "../controllers/organisation";

const organisationRouter = Router();
const organisationsController = new OrganisationController();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

organisationRouter.get(
  "/organisation",
  organisationsController.fetchorganisation
);
organisationRouter.post(
  "/organisation",
  userAuthMiddleware,
  organisationsController.createorganisation
);

organisationRouter.put(
  "/organisation",
  userAuthMiddleware,
  organisationsController.updateorganisation
);

organisationRouter.delete(
  "/organisation",
  userAuthMiddleware,
  organisationsController.deleteorganisation
);

export default organisationRouter;
