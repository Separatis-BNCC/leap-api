"use strict";
import { Dialect, Sequelize } from "sequelize";
import { config } from "../config/config";

let sequelize;

if (process.env.NODE_ENV == "production") {
  sequelize = new Sequelize(
    config.production.database,
    config.production.username,
    config.production.password,
    {
      username: config.production.username,
      password: config.production.password,
      database: config.production.database,
      host: config.production.host,
      dialect: config.production.dialect as Dialect,
    }
  );
} else {
  sequelize = new Sequelize(
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
}

export default sequelize as any;
