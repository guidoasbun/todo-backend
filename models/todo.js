"use strict";
// const { STRING, BOOLEAN } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      //
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }

    // Hides the id and password from the response
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }; // Hides the id and password from the response
    }
  }
  Todo.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Task is required" },
          isLength(value) {
            if (value.length < 2) {
              throw new Error("A todo must have at least 2 characters");
            }
          },
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Completed is required" },
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "todos",
      modelName: "Todo",
    }
  );
  return Todo;
};
