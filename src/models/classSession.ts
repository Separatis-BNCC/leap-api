"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ClassSessionAttributes {
  id?: number;
  schedule: string;
  recording: string;
  class_id: number;
  session_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class ClassSession
  extends Model<ClassSessionAttributes>
  implements ClassSessionAttributes
{
  public id!: number;
  public schedule!: string;
  public recording!: string;
  public class_id!: number;
  public session_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

ClassSession.init(
  {
    schedule: {
      type: DataTypes.STRING,
    },
    recording: {
      type: DataTypes.STRING,
    },
    class_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Class ID must be a number!",
        },
        notEmpty: {
          msg: "Class ID required!",
        },
      },
    },
    session_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Session ID must be a number!",
        },
        notEmpty: {
          msg: "Session ID required!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "ClassSession",
  }
);

export default ClassSession;
