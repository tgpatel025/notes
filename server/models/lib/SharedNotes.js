const Sequelize = require('sequelize');
const sequelize = require('../../utils/sequelize');

const SharedNotes = sequelize.define(
    'sharedNotes',
    {
        sharedWithId: {
            type: Sequelize.BIGINT,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        sharedById: {
            type: Sequelize.BIGINT,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        noteId: {
            type: Sequelize.BIGINT,
            references: {
                model: 'notes',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                fields: ["noteId", "sharedWithId", "sharedById"],
                unique: true,
            }
        ]
    }
);

SharedNotes.sync({ alter: true });

module.exports = SharedNotes;
