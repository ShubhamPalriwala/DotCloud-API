import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user";
import schemas from "../middleware/schemas";
import validator from "../middleware/validation";

const userRouter = Router();
const userController = new UserController();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

userRouter.post(
  "/signup",
  validator(schemas.signup),
  userController.userSignUp
);
userRouter.post("/login", validator(schemas.login), userController.userLogin);
userRouter.get("/profile", userAuthMiddleware, userController.userRead);

export default userRouter;
