"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Class from "./class";
import Session from "./session";
import Assignment from "./assignment";

interface CourseAttributes {
  id?: number;
  name: string;
  region: number;
  total_sessions?: number;
  status?: number;
  sessions?: any[];

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
  public id!: number;
  public name!: string;
  public region!: number;
  public total_sessions!: number;
  public status!: number;
  public sessions!: any[];

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
    total_sessions: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Total Session must be a number!",
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

Course.hasMany(Session, { foreignKey: "course_id", as: "sessions" });
Course.hasMany(Assignment, { foreignKey: "course_id", as: "assignments" });

export default Course;
