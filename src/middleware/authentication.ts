import { Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
import * as dotenv from "dotenv";
import User from "../database/models/user.model";
import { SuccessResponse } from "../core/ApiResponse";

dotenv.config();

const { ExtractJwt } = passportJWT;

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "userStrategy",
  new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
    try {
      const user = await User.findOne({
        where: { username: jwtPayload.username },
      });
      if (user === null) {
        throw new Error("no user");
      } else {
        next(null, user);
      }
    } catch (error) {
      next(null, false);
    }
  })
);

interface Payload {
  username: string;
}

const generateJwtToken = (
  payload: Payload,
  res: Response,
  responseData: User
): void => {
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  new SuccessResponse("User Data", { token, user: responseData }).send(res);
};

export default { generateJwtToken };
