/* eslint-disable no-undef */
const Redis = require('redis');
const CONFIG = require('./config');
const { infoLogger, errorLogger } = require('../middleware/logger');

const redisClient = Redis.createClient({ url: CONFIG.REDIS_URL });

redisClient.on('connect', () => {
	infoLogger.info('redis client connected');
});
redisClient.on('error', (error) => {
	infoLogger.info('error connecting to redis client');
	errorLogger.error(error.message);
});

module.exports = redisClient;
