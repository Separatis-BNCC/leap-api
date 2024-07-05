"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface SessionAttributes {
  id?: number;
  week: number;
  description: string;
  course_id: number;
  status?: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Session extends Model<SessionAttributes> implements SessionAttributes {
  public id!: number;
  public week!: number;
  public description!: string;
  public course_id!: number;
  public status!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Session.init(
  {
    week: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Week required!",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Course name required!",
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
    modelName: "Session",
  }
);

export default Session;
