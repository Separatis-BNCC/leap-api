"use strict";
import { Model, DataTypes, Association } from "sequelize";
import connection from "./connection";
import bcrypt from "bcryptjs";
import Profile from "./profile";

interface CredentialAttributes {
  id?: number;
  email: string;
  password: string;
  role: number;
  active?: boolean;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Credential
  extends Model<CredentialAttributes>
  implements CredentialAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: number;
  public active!: boolean;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Credential.init(
  {
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    email: {
      unique: {
        name: "email_unique",
        msg: "Email already used!",
      },
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid email format!",
        },
        notEmpty: {
          msg: "Password required!",
        },
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash;
      },
      afterCreate() {},
    },
    sequelize: connection,
    modelName: "Credential",
  }
);

Credential.hasOne(Profile, { foreignKey: "id", as: "profile" });

export default Credential;
