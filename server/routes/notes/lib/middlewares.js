const { matchedData } = require("express-validator");
const { Notes } = require("../../../models");

const isValidNote = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const note = await Notes.findByPk(data.id, { raw: true });
    
        if (!note) return res.status(404).json({ message: "Note not found" });
        if (+note.userId !== req.session.user.id) return res.status(403).json({ message: "User is not authorized to access this note." });
        req.note = note;
    
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    isValidNote
};
