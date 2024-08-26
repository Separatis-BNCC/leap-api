'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      approved: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      proof: {
        type: Sequelize.STRING,
      },
      credential_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Credentials",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      class_session_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ClassSessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attendances');
  }
};