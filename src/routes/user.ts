import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user";

const userRouter = Router();
const userController = new UserController();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

userRouter.post("/signup", userController.userSignUp);
userRouter.post("/login", userController.userLogin);
userRouter.get("/profile", userAuthMiddleware, userController.userRead);

export default userRouter;
