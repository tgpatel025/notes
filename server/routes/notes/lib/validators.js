const { body, query, param } = require("express-validator");

const noteValidator = () => {
  return [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("note id must not be empty")
      .toInt(),
    query("offset").optional().trim().isNumeric(),
    query("limit").optional().trim().isNumeric(),
  ];
};

const createOrUpdateNoteValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("title must not be empty"),
    body("content").trim().notEmpty().withMessage("content must not be empty"),
  ];
};

const shareNoteValidator = () => {
  return [body("shareWith").isArray({ min: 1 })];
};

module.exports = {
  noteValidator,
  createOrUpdateNoteValidator,
  shareNoteValidator,
};
