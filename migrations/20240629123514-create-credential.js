"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Credentials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Username required!",
          },
          isUnique: {
            msg: "Username already used!",
          },
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Password required!",
          },
        },
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: "Invalid email format!",
          },
          notEmpty: {
            msg: "Password required!",
          },
          isUnique: {
            msg: "Email already used!",
          },
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Credentials");
  },
};
