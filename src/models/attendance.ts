"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface AttendanceAttributes {
  id?: number;
  approved?: number;
  proof?: string;
  credential_id: number;
  class_session_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Attendance extends Model<AttendanceAttributes> implements AttendanceAttributes {
  public id!: number;
  public approved!: number;
  public proof!: string;
  public credential_id!: number;
  public class_session_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Attendance.init(
  {
    approved: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    proof: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    credential_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Credential ID must be a number!",
        },
        notEmpty: {
          msg: "Credential ID required!",
        },
      },
    },
    class_session_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Class Session ID must be a number!",
        },
        notEmpty: {
          msg: "Class Session ID required!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Attendance",
  }
);

export default Attendance;
