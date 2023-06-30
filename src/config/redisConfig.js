/* eslint-disable no-undef */
const Redis = require('redis');
const CONFIG = require('./config');
const { infoLogger, errorLogger } = require('../middleware/logger');

// class RedisCache {
// 	constructor() {
// 		this.redis = null;
// 	}

// 	async connect() {
// 		try {
// 			this.redis = await Redis.createClient({
// 				url: CONFIG.REDIS_URL,
// 			});

// 			this.redis.connect();
// 			this.redis.on('connect', () => infoLogger.info('Redis connected'));

// 			this.redis.on('error', () => console.error('Redis connection error'));
// 		} catch (error) {
// 			errorLogger.error(error);
// 		}
// 	}
// }

const redisClient = Redis.createClient({ url: CONFIG.REDIS_URL });

redisClient.on('connect', () => {
	infoLogger.info('redis client connected');
});
redisClient.on('error', (error) => {
	infoLogger.info('error connecting to redis client');
	errorLogger.error(error.message);
});

module.exports = redisClient;
