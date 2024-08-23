"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface MemberAssignmentAttributes {
  id?: number;
  score?: number;
  desc?: string;
  status?: number;
  credential_id: number;
  assignment_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class MemberAssignment
  extends Model<MemberAssignmentAttributes>
  implements MemberAssignmentAttributes
{
  public id!: number;
  public score!: number;
  public desc!: string;
  public status!: number;
  public credential_id!: number;
  public assignment_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

MemberAssignment.init(
  {
    score: {
      allowNull: false,
      type:DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Score must be a number!",
        },
      },
    },
    status: {
      type:DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Status must be a number!"
        }
      }
    },
    desc: {
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
    assignment_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Assignment ID must be a number!",
        },
        notEmpty: {
          msg: "Assignment ID required!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "MemberAssignment",
  }
);

export default MemberAssignment;
