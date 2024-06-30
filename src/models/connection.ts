"use strict";
import { Dialect, Sequelize } from "sequelize";
import { config } from "../config/config";

let sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    username: config.development.username,
    password: config.development.password,
    database: config.development.database,
    host: config.development.host,
    dialect: config.development.dialect as Dialect,
  }
);

export default sequelize;
