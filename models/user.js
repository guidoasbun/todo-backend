"use strict";
const { STRING } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Todo }) {
      // define association here

      this.hasMany(Todo, { foreignKey: "userId", as: "todos" });
    }

    // Hides the id and password from the response
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined }; // Hides the id and password from the response
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "First name is required" },
          notEmpty: { msg: "First name is must not be empty" },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "username is required" },
          notEmpty: { msg: "username is must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is must not be empty" },
          isEmail: { msg: "Email is not valid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password name is required" },
          notEmpty: { msg: "password name is must not be empty" },
          isLength(value) {
            if (value.length < 6) {
              throw new Error("Password must be at least 6 characters long");
            }
          }
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
