const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const apiRouter = require('./router/app.router');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use(apiRouter);

// Listen
app.listen(PORT, () => {
    console.log('Ready on port', PORT);
})
