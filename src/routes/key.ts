import { Router } from "express";
import KeysController from "../controllers/key";

const keysRouter = Router();
const keysController = new KeysController();

keysRouter.get("/keys/all", keysController.fetchProjectKeys);
keysRouter.get("/keys", keysController.fetchKey);
keysRouter.post("/keys", keysController.createKey);
keysRouter.put("/keys", keysController.updateKey);
keysRouter.delete("/keys", keysController.deleteKey);

export default keysRouter;
