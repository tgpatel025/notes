const express = require('express');
const { createNote, deleteNote, shareNote, fetchAllNotes, fetchNoteById, updateNote, fetchAllNotesSharedWithMe } = require("./lib/controllers");
const { createOrUpdateNoteValidator, noteValidator, shareNoteValidator } = require("./lib/validators");
const { isValidNote } = require("./lib/middlewares");
const validate = require("../validate");

const router = express.Router();

router.get('/', fetchAllNotes);
router.get('/shared-with-me', fetchAllNotesSharedWithMe);
router.get('/:id', noteValidator(), validate, isValidNote, fetchNoteById);
router.post('/', createOrUpdateNoteValidator(), validate, createNote);
router.put('/:id', noteValidator(), createOrUpdateNoteValidator(), validate, isValidNote, updateNote);
router.delete('/:id', noteValidator(), validate, isValidNote, deleteNote);
router.post('/:id/share', noteValidator(), shareNoteValidator(), validate, isValidNote, shareNote);

module.exports = router;
