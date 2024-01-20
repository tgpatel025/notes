const Sequelize = require('sequelize');
const sequelize = require('../../utils/sequelize');

const Notes = sequelize.define(
    'notes',
    {
        userId: {
            type: Sequelize.BIGINT,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING(10485760),
            allowNull: false,
        },
    }
);

Notes.sync({ alter: true });

module.exports = Notes;
