require("dotenv").config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const routes = require('./routes/index');
const helmet = require('helmet');
const db = require("./utils/sequelize");
const session = require("express-session");
const sessionConnector = require("connect-pg-simple");
const { Pool } = require('pg');

// DB initialization
db.authenticate();

const app = express();

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session configuration
const PgSession = sessionConnector(session);
const pgPool = new Pool();
app.use(session({
    store: new PgSession({
        pool: pgPool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.SECURE
    }
}));

app.use('/api', routes);
app.use('*', (req, res) => {
    res.status(404);
    res.send("Route not found");
});
app.use((err, req, res, next) => {
    console.error(`${req.method} ${req.url}p`);
    console.error('body -> ', req.body);
    console.error(err.stack);
    next(err);
});
app.use(() => {
    res.status(500);
    res.send({ message: err });
});

process.on('uncaughtException', (error) => {
    console.error(`UncaughtException:: ${error.name} ${error.message} ${error.stack}`);
});

module.exports = app;
