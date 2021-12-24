"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "323d1bc7-b4af-4d7b-b94f-01b7690a68e0",
          first_name: "1userFirst",
          last_name: "1userLast",
          username: "1userUsername",
          email: "1user@email.com",
          password: "1userPassword",
          createdAt: "2021-12-23T23:51:02.584Z",
          updatedAt: "2021-12-23T23:51:02.584Z",
        },
        {
          uuid: "e689d14e-5eba-4dc3-8829-6c108ac7a1f5",
          first_name: "2userFirst",
          last_name: "2userLast",
          username: "2userUsername",
          email: "2user@email.com",
          password: "2userPassword",
          createdAt: "2021-12-23T23:51:19.063Z",
          updatedAt: "2021-12-23T23:51:19.063Z",
        },
        {
          uuid: "08d61fe3-7401-4a47-b33e-dca8eae5397a",
          first_name: "3userFirst",
          last_name: "3userLast",
          username: "3username",
          email: "3user@email.com",
          password: "3userPassword",
          createdAt: "2021-12-23T23:51:29.831Z",
          updatedAt: "2021-12-24T04:55:08.070Z",
        },
        {
          uuid: "52655891-3774-4661-b317-e1846733b93c",
          first_name: "4userFirst",
          last_name: "4userLast",
          username: "4username",
          email: "4user@email.com",
          password: "4userPassword",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
