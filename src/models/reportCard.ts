"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ReportCardAttributes {
  id?: number;
  document_url: string;
  desc: string;
  credential_id: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class ReportCard
  extends Model<ReportCardAttributes>
  implements ReportCardAttributes
{
  public id?: number;
  public document_url!: string;
  public desc!: string;
  public credential_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

ReportCard.init(
  {
    document_url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Document url required!",
        },
      },
    },
    desc: {
      type: DataTypes.STRING,
    },
    credential_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric:{
          msg: "Credential_ID must be a number!",
        },
      }
    }
  },
  {
    sequelize: connection,
    modelName: "ReportCard",
  }
);

export default ReportCard;