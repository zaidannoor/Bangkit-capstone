'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("messages", [
      {
        id: 1,
        question: 'Halo',
        reply: 'Halo, adakah yang bisa saya bantu ?',
        id_conversation: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        question: 'Apakah saya sehat',
        reply: 'Tolong berikan informasi yang lebih spesifik ?',
        id_conversation: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  }
};
