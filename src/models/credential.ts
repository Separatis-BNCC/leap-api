"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import bcrypt from "bcryptjs";

interface CredentialAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Credential
  extends Model<CredentialAttributes>
  implements CredentialAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Credential.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.INTEGER,
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

export default Credential;
