"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ReportCardAttributes {
  id?: number;
  document_url: string;
  desc: string;

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
  public credential_id!: string;

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
  },
  {
    sequelize: connection,
    modelName: "ReportCard",
  }
);
