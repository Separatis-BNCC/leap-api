"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ConfigAttributes {
  id?: number;
  name: string;
  state: string;
  level: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Config extends Model<ConfigAttributes> implements ConfigAttributes {
  public id!: number;
  public name!: string;
  public state!: string;
  public level!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Config.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Config name required!",
        }
      },
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Config state required!",
        },
      },
    },
    level: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Config level required!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Config",
  }
);

export default Config;
