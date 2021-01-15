/* eslint-disable import/first */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import * as dotenv from "dotenv";

dotenv.config();

import "./database";
import app from "./app";

declare module "express-serve-static-core" {
  export interface Request {
    user?: import("./database/models/user.model").default;
  }
}

const port = process.env.PORT || "8000";

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (e: Error) => console.log(e));
