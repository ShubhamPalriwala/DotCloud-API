import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "dotCloud",
  dialect: "postgres",
  username: "postgres",
  password: "toor",
  storage: ":memory:",
  models: [`${__dirname}/models`], // or [Player, Team],
});

sequelize
  .sync({ force: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error connecting to database due to ${err}`));
