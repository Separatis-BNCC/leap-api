"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface ProfileAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  nim: string;
  birthDate: Date;
  region: number;
  faculty: number;
  major: number;
  phone_number: string;
  line_id: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id?: number;
  public firstName!: string;
  public lastName!: string;
  public nim!: string;
  public birthDate!: Date;
  public region!: number;
  public faculty!: number;
  public major!: number;
  public phone_number!: string;
  public line_id!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Profile.init(
  {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    nim: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    faculty: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    major: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    line_id: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
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
