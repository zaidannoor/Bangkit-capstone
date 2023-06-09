"use strict";
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */

async function generateUser(rowCount) {
  const data = [];
  for (let i = 0; i < rowCount; i++) {
    let newUser = {
      userName: faker.name.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("qwertyuiop", 10),
      id_role: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    data.push(newUser);
  }
  data.push({
    userName: "bot-chat",
    email: faker.internet.email(),
    password: await bcrypt.hash("qwertyuiop", 10),
    id_role: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return data;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", await generateUser(4));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
