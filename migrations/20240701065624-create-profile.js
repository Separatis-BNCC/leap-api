"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Credentials", key: "id" },
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      region: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      faculty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      major: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      line_id: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Profiles");
  },
};
