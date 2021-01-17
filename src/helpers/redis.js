const { promisify } = require('util');
const redis = require('redis');
const winston = require('../config/logger');

const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
  winston.info('connected to redis server');
});

const getAsync = promisify(client.get).bind(client);

exports.getAsync = getAsync;
exports.client = client;
