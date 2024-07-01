import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  development: {
    username: process.env.DB_USERNAME_DEV || "",
    password: process.env.DB_PASSWORD_DEV || "",
    database: process.env.DB_NAME_DEV || "",
    host: process.env.DB_HOST_DEV || "",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME_STG || "",
    password: process.env.DB_PASSWORD_STG || "",
    database: process.env.DB_NAME_STG || "",
    host: process.env.DB_HOST_STG || "",
    dialect: "postgres",
  },
};
