"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface CourseAttributes {
  id?: number;
  name: string;
  region: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
  public id!: number;
  public name!: string;
  public region!: number;

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
  },
  {
    sequelize: connection,
    modelName: "Course",
  }
);

export default Course;
