const http = require('http');
const { config } = require('dotenv');
const Q = require('q');
const winston = require('./config/logger');
const app = require('./app');

config();
require('./helpers/connection').rabbitmq();
require('./helpers/connection').subscribe();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// To throw handle cloudinary rejections as error messages
Q.stopUnhandledRejectionTracking();

process.on('uncaughtException', error => {
  process.exit(1);
});

process.on('unhandledRejection', err => {
  winston.error(`Unhandled Rejection - ${err.message}`);
  process.exit(1);
});

server.listen(PORT, () => {
  winston.info(
    `server running on port ${PORT} in ${process.env.NODE_ENV} mode.\nPress CTRL-C to stop`,
  );
});
