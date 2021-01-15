import { Sequelize } from "sequelize-typescript";

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    storage: ":memory:",
    models: [`${__dirname}/models`],
  });
} else {
  sequelize = new Sequelize({
    database: "dotCloud",
    dialect: "postgres",
    username: "postgres",
    password: "toor",
    storage: ":memory:",
    models: [`${__dirname}/models`],
  });
}

sequelize
  .sync({ force: false, logging: false })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error connecting to database due to ${err}`));
