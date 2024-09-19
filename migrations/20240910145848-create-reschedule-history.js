'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RescheduleHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule: {
        allowNull: false,
        type: Sequelize.DATE
      },
      approved: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      class_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Classes", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete:"CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RescheduleHistories');
  }
};