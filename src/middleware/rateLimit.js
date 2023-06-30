const rateLimit = require('express-rate-limit');
const CONFIG = require('../config/config');

const rateLimiter = rateLimit({
	windowMs: parseInt(CONFIG.rateLimitWindowMs),
	max: parseInt(CONFIG.rateLimitMax),
	message: `You have exceeded your request limit`,
	standardHeaders: false,
	legacyHeaders: false,
});

module.exports = rateLimiter;
