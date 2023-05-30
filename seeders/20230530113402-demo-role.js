'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        id: 1,
        roleName: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        roleName: "bot",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
