import { Router } from "express";
import passport from "passport";
import KeysController from "../controllers/key";

const keysRouter = Router();
const keysController = new KeysController();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

keysRouter.get("/all", keysController.fetchProjectKeys);
keysRouter.get("/", keysController.fetchKey);
keysRouter.post("/", userAuthMiddleware, keysController.createKey);
keysRouter.put("/", userAuthMiddleware, keysController.updateKey);
keysRouter.delete("/", userAuthMiddleware, keysController.deleteKey);

export default keysRouter;
