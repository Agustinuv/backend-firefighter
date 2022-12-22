const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const routes = require('./routes/index');
const { errorHandler, notFoundHandler } = require('./middlewares/errors/errorHandler');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;