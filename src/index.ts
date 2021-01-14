import app from "./app";
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import "./database";

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
