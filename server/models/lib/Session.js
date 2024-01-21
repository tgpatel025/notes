const Sequelize = require("sequelize");
const sequelize = require("../../utils/sequelize");

const Session = sequelize.define(
  "Session",
  {
    sid: {
      allowNull: false,
      type: Sequelize.STRING,
      primaryKey: true,
    },
    sess: {
      allowNull: false,
      type: Sequelize.JSON,
    },
    expire: {
      allowNull: false,
      type: Sequelize.DATE(6),
    },
  },
  {
    tableName: "session",
    indexes: [
      {
        name: "IDX_session_expire",
        fields: ["expire"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

Session.sync({ alter: true });

module.exports = Session;
