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
      const { username, email, password, phone } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phone,
      });
      new SuccessResponse("User has been created!", {
        uesrname: user.username,
        email: user.email,
      }).send(res);
    } catch (error) {
      new InternalErrorResponse("Error signing up user!").send(res);
    }
  };

  userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        attributes: ["username", "email"],
        where: {
          email,
          password,
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
      const { username } = req.user;

      const user = await User.findOne({
        where: { username },
      });
      new SuccessResponse("Found user!", user).send(res);
    } catch (error) {
      new InternalErrorResponse("Error reading user Profile!").send(res);
    }
  };
}

export default userController;
