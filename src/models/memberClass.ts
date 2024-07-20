"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface MemberClassAttributes {
  id?: number;
  is_praetorian: boolean;
  status?: number;
  credential_id: number;
  class_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class MemberClass
  extends Model<MemberClassAttributes>
  implements MemberClassAttributes
{
  public id!: number;
  public is_praetorian!: boolean;
  public status?: number;
  public credential_id!: number;
  public class_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

MemberClass.init(
  {
    is_praetorian: {
      type: DataTypes.STRING,
      defaultValue: false,
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
  },
  {
    sequelize: connection,
    modelName: "MemberClass",
  }
);

export default MemberClass;
