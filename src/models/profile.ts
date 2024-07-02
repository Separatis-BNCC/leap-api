"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ProfileAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  nim: string;
  birth_date: Date;
  region: number;
  faculty: number;
  major: number;
  line_id: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id?: number;
  public first_name!: string;
  public last_name!: string;
  public nim!: string;
  public birth_date!: Date;
  public region!: number;
  public faculty!: number;
  public major!: number;
  public line_id!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Profile.init(
  {
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First name required!",
        },
      },
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Last name required!",
        },
      },
    },
    nim: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "NIM required!",
        },
      },
    },
    birth_date: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Birth date required!",
        },
        isDate: {
          args: true,
          msg: "Date invalid!",
        },
      },
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Region required!",
        },
      },
    },
    faculty: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Faculty required!",
        },
      },
    },
    major: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Major required!",
        },
      },
    },
    line_id: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "ID Line required!",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Profile",
  }
);

export default Profile;
