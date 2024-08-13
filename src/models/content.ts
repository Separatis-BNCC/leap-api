"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ContentAttributes {
  id?: number;
  content_type: "link" | "video" | "document";
  url: string;
  desc?: string;
  session_id?: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Content extends Model<ContentAttributes> implements ContentAttributes {
  public id!: number;
  public content_type!: "link" | "video" | "document";
  public url!: string;
  public desc!: string;
  public session_id!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Content.init(
  {
    content_type: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["link", "document", "video"]],
          msg: "Content type must be either 'link', 'document', or 'video'!",
        },
      },
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Content URL required!",
        },
      },
    },
    desc: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Content description required!",
        },
      },
    },
    session_id: {
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
    modelName: "Content",
  }
);

export default Content;
