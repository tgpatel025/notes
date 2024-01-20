const express = require('express');
const { signup, logout, login } = require("./lib/controllers");
const { loginValidator, signupValidator } = require("./lib/validators");
const validate = require('../validate');

const router = express.Router();

router.post('/signup', signupValidator(), validate, signup);
router.post('/login', loginValidator(), validate, login);
router.post('/logout', logout);

module.exports = router;
