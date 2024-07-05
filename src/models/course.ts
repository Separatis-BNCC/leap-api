"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Class from "./class";
import Session from "./session";

interface CourseAttributes {
  id?: number;
  name: string;
  region: number;
  status?: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
  public id!: number;
  public name!: string;
  public region!: number;
  public status!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Course.init(
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
    region: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Region required!",
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
  },
  {
    sequelize: connection,
    modelName: "Course",
  }
);

Course.hasMany(Class, { foreignKey: "course_id", as: "classes" });
Course.hasMany(Session, { foreignKey: "course_id", as: "sessions" });

export default Course;
