import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
import * as dotenv from "dotenv";
import User from "../database/models/user.model";

dotenv.config();

const { ExtractJwt } = passportJWT;

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {} as any;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

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
  res: any,
  responseData: any
): void => {
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  res.send({ token, user: responseData });
};

export default { generateJwtToken };
