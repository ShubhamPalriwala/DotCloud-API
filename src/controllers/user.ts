import { Request, Response } from "express";
import {
  AuthFailureResponse,
  InternalErrorResponse,
  SuccessResponse,
  ForbiddenResponse,
} from "../core/ApiResponse";
import User from "../database/models/user.model";

import authMiddleware from "../middleware/authentication";

class userController {
  userSignUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });
      new SuccessResponse("User has been created!", user).send(res);
    } catch (error) {
      new InternalErrorResponse("Error signing up user!").send(res);
    }
  };

  userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      if (user === null) {
        new AuthFailureResponse(
          "Please check your password otherwise Sign Up first!"
        ).send(res);
      } else {
        const payload = { username: user.username };
        authMiddleware.generateJwtToken(payload, res, user);
      }
    } catch (error) {
      new ForbiddenResponse("Error on user login!").send(res);
    }
  };

  userRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({
        where: { username: req.user.username },
      });
      new SuccessResponse("Found user!", user).send(res);
    } catch (error) {
      new InternalErrorResponse("Error updating the key!").send(res);
    }
  };
}

export default userController;
