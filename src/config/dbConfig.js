const mongoose = require('mongoose');
const CONFIG = require('./config');
const { errorLogger, infoLogger } = require('../middleware/logger');

const dbConnection = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(CONFIG.url);
		infoLogger.info('Database connected successfully');
	} catch (error) {
		errorLogger.error(error);
		infoLogger.info('An error occurred while connecting to the database');
	}
};

module.exports = dbConnection;
