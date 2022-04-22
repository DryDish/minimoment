import { Sequelize } from "sequelize";

// Constants
const HOST = process.env.MYSQL_DB_HOST || "localhost";
const USER = process.env.MYSQL_DB_USER || "";
const PASSWORD = process.env.MYSQL_DB_PASSWORD || "";
const SCHEMA = process.env.MYSQL_DB_SCHEMA || "";

const sequelize = new Sequelize(SCHEMA, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

export const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to the database at: ${HOST}/${SCHEMA} with user: ${USER}`
    );
  } catch (error) {
    console.error(
      `Unable to connect to the database at: ${HOST}/${SCHEMA} with user: ${USER}.`,
      error
    );
  }
};
