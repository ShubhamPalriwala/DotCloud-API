import { Request, Response } from "express";
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
      res.send(user);
    } catch (error) {
      res.send(error);
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
        res.send({ message: "signup or check password" });
      } else {
        const payload = { username: user.username };
        authMiddleware.generateJwtToken(payload, res, user);
      }
    } catch (error) {
      res.send(error);
    }
  };

  userRead = async (req: any, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({
        where: { username: req.user.username },
      });
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  };
}

export default userController;
