"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("conversations", [
      {
        id: 1,
        title: "Halo",
        id_user: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "New Conversation",
        id_user: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conversations", null, {});
  },
};
