/* eslint-disable import/first */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import * as dotenv from "dotenv";

dotenv.config();

import "./database";
import app from "./app";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const port = process.env.PORT || "8000";

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (e: Error) => console.log(e));
