const express = require('express');
const { config } = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const winston = require('./config/logger');
const routes = require('./routes');

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream }));
app.use(cookieParser());

app.use('/api/v1', routes);

app.get('/', (_, response) => {
  response.status(404).json({
    status: 'success',
    error: 'welcome',
  });
});

app.all('*', (request, response) => {
  winston.error(
    `404 - Page not found - ${request.originalUrl} - ${request.method} - ${request.ip}`,
  );

  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

app.use(errorHandler);

module.exports = app;
