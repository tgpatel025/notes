const Notes = require("./lib/Notes");
const Users = require("./lib/Users");
const SharedNotes = require("./lib/SharedNotes");
const Session = require("./lib/Session");

SharedNotes.belongsTo(Notes);
SharedNotes.belongsTo(Users, { foreignKey: "sharedById" });
SharedNotes.belongsTo(Users, { foreignKey: "sharedWithId" });
Notes.belongsToMany(Users, { through: SharedNotes });
Users.belongsToMany(Notes, {
  through: SharedNotes,
  foreignKey: "sharedWithId",
});
Users.belongsToMany(Notes, { through: SharedNotes, foreignKey: "sharedById" });

Users.hasMany(Notes, { onDelete: "cascade" });
Notes.belongsTo(Users);

module.exports = {
  Notes,
  Users,
  SharedNotes,
  Session,
};
