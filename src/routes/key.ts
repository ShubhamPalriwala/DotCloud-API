import { Router } from "express";
import passport from "passport";
import KeysController from "../controllers/key";
import schemas from "../middleware/schemas";
import validator from "../middleware/validation";

const keysRouter = Router();
const keysController = new KeysController();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

keysRouter.get("/all", keysController.fetchProjectKeys);
keysRouter.get("/", keysController.fetchKey);
keysRouter.post(
  "/",
  validator(schemas.createKey),
  userAuthMiddleware,
  keysController.createKey
);
keysRouter.put(
  "/",
  validator(schemas.updateKey),
  userAuthMiddleware,
  keysController.updateKey
);
keysRouter.delete("/", userAuthMiddleware, keysController.deleteKey);

export default keysRouter;
