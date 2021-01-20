import uuid from "uuid-random";
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
    const generatedToken = uuid();
    try {
      const { username, email, password, phone } = req.body;
      const user = await User.create({
        token: generatedToken,
        username,
        email,
        password,
        phone,
      });
      new SuccessResponse("User has been created! Please Sign In!", {
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
        attributes: ["username", "email", "token", "password"],
        where: {
          email,
        },
      });
      if (user === null) {
        new AuthFailureResponse("Please Sign Up!").send(res);
      } else {
        const CheckPassword = await user.CheckPassword(password);

        if (CheckPassword) {
          const payload = { username: user.username };
          authMiddleware.generateJwtToken(payload, res, user);
        } else {
          throw new Error("Incorrect Password");
        }
      }
    } catch (error) {
      new ForbiddenResponse("Incorrect Password!").send(res);
    }
  };

  userRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.user;

      const user = await User.findOne({
        where: { username },
        attributes: ["username", "email", "token", "password"],
      });
      new SuccessResponse("Found user!", user).send(res);
    } catch (error) {
      new InternalErrorResponse("Error reading user Profile!").send(res);
    }
  };
}

export default userController;
