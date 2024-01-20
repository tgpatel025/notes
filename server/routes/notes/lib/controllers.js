const { matchedData } = require("express-validator");
const { Notes, SharedNotes, Users } = require("../../../models");
const { Sequelize } = require("sequelize");

const fetchAllNotes = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const offset = data.offset ?? 0;
        const limit = data.limit ?? 20;
        const notes = await Notes.findAndCountAll({
            limit,
            offset,
            where: { userId: req.session.user.id },
            raw: true,
            order: [["updatedAt", "DESC"]]
        });
        res.json({ ...notes, offset: offset + notes.rows.length });
    } catch (error) {
        next(error);
    }
};

const fetchAllNotesSharedWithMe = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const offset = data.offset ?? 0;
        const limit = data.limit ?? 20;
        const notes = await SharedNotes.findAndCountAll({
            limit,
            offset,
            where: { userId: req.session.user.id },
            include: [
                {
                    model: Notes,
                    include: Users
                }
            ],
            raw: true,
            order: [["updatedAt", "DESC"]]
        });
        res.json({ ...notes, offset: offset + notes.rows.length });
    } catch (error) {
        next(error);
    }
};

const fetchNoteById = async (req, res, next) => {
    try {
        res.json(req.note);
    } catch (error) {
        next(error);
    }
};

const createNote = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const note = await Notes.create({ ...data, userId: req.session.user.id });
        if (!note) return res.json({ message: "Oops, something went wrong. Please try again in sometime." });
        res.json({ message: "Note created successfully!" });
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const [updateCount] = await Notes.update(data, { where: { id: data.id }, raw: true });
        if (!updateCount) return res.json({ message: "Oops, something went wrong. Please try to save again." });
        res.json({ message: "Note updated successfully!" });
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const { id } = matchedData(req);
        const note = await Notes.destroy({ where: { id } });
        if (!note) return res.json({ message: "Oops, something went wrong. Please try to save again." });
        res.json({ message: "Note deleted successfully!" });
    } catch (error) {
        next(error);
    }
};

const shareNote = async (req, res, next) => {
    try {
        const { id, shareWith } = matchedData(req);
        if (shareWith.includes(req.session.user.id)) return res.json({ message: "User cannot share note with itself." });
        const dataToInsert = shareWith.map((userId) => ({ noteId: id, sharedWithId: zuserId, sharedById: req.session.user.id }));
        const shared = await SharedNotes.bulkCreate(dataToInsert, {
            updateOnDuplicate: ["updatedAt"]
        });
        if (!shared.length) return res.json({ message: "Oops, something went wrong. Please try to share again." })
        res.json({ message: "Note shared successfully! " });
    } catch (error) {
        next(error.message);
    }
};

module.exports = {
    fetchAllNotes,
    fetchAllNotesSharedWithMe,
    fetchNoteById,
    createNote,
    updateNote,
    deleteNote,
    shareNote,
};
