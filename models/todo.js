"use strict";
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
      this.belongsTo(User, { foreignKey: "userId" });
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
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
