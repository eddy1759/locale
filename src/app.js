const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const CONFIG = require('./config/config');
const dbConnection = require('./config/dbConfig');
const redisClient = require('./config/redisConfig');

const { userRoutes, apiKeyRoutes, locationRoutes } = require('./routes/index');
const rateLimiter = require('./middleware/rateLimit');
const { infoLogger } = require('./middleware/logger');

const app = express();
const PORT = CONFIG.PORT;

// Connect to the database
dbConnection();

// Connect to Redis
redisClient.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
	session({
		secret: CONFIG.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// Rate limiter middleware
app.use(rateLimiter);

// Routes
app.use('/api', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/api-keys', apiKeyRoutes);

// Start the server
app.listen(PORT, () => {
	infoLogger.info(`Server is running on port ${PORT}`);
});
