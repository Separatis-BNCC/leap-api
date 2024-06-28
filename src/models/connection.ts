"use strict";
import { Sequelize } from "sequelize";
import { config } from "../config/config";

let sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    username: "root",
    password: "",
    database: "leap_db",
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

export default sequelize;
