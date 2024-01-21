const Sequelize = require("sequelize");
const sequelize = require("../../utils/sequelize");

const Users = sequelize.define("users", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Users.sync();

module.exports = Users;
