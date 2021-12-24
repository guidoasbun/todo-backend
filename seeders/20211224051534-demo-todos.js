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
      "todos",
      [
        {
          userId: 1,
          task: "user1 task1",
          completed: false,
          image: "https://guido-asbun.s3.amazonaws.com/IMG_0879.JPG",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
        {
          userId: 2,
          task: "user2 task1",
          completed: false,
          image: "https://guido-asbun.s3.amazonaws.com/IMG_0879.JPG",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
        {
          userId: 3,
          task: "user3 task1",
          completed: false,
          image: "https://guido-asbun.s3.amazonaws.com/IMG_0879.JPG",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
        {
          userId: 4,
          task: "user4 task1",
          completed: false,
          image: "https://guido-asbun.s3.amazonaws.com/IMG_0879.JPG",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
        {
          userId: 4,
          task: "user4 task2",
          completed: false,
          image: "",
          updatedAt: "2021-12-24T06:02:20.342Z",
          createdAt: "2021-12-24T06:02:20.342Z",
        },
        {
          userId: 4,
          task: "user4 task3",
          completed: false,
          image: "",
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

    await queryInterface.bulkDelete("todos", null, {});
  },
};
