const express = require("express");
const authRouter = require("./auth/index");
const noteRouter = require("./notes/index");
const searchRouter = require("./search/index");
const { isAuthenticated } = require("./common/middlewares");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/notes", isAuthenticated, noteRouter);
router.use("/search", isAuthenticated, searchRouter);

module.exports = router;
