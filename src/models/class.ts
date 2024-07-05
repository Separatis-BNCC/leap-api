"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ClassAttributes {
  id?: number;
  name: string;
  day_of_week: number;
  hour: number;
  minute: number;
  status?: number;
  course_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Class extends Model<ClassAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;
  public day_of_week!: number;
  public hour!: number;
  public minute!: number;
  public status!: number;
  public course_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Class.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Course name required!",
        },
      },
    },
    day_of_week: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [6],
          msg: "Invalid time!",
        },
        min: {
          args: [0],
          msg: "Invalid time!",
        },
      },
    },
    hour: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [23],
          msg: "Invalid time!",
        },
        min: {
          args: [0],
          msg: "Invalid time!",
        },
      },
    },
    minute: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [59],
          msg: "Invalid time!",
        },
        min: {
          args: [0],
          msg: "Invalid time!",
        },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isNumeric: {
          msg: "Status must be a number!",
        },
      },
    },
    course_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Course ID must be a number!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Class",
  }
);

export default Class;
