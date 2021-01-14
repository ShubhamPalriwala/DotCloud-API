import { Router } from "express";
import KeysController from "../controllers/key";

const keysRouter = Router();
const keysController = new KeysController();

keysRouter.get("/all", keysController.fetchProjectKeys);
keysRouter.get("/", keysController.fetchKey);
keysRouter.post("/", keysController.createKey);
keysRouter.put("/", keysController.updateKey);
keysRouter.delete("/", keysController.deleteKey);

export default keysRouter;
