const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const CONFIG = require('./config/config');
const dbConnection = require('./config/dbConfig');
const redisClient = require('./config/redisConfig');
const specs = require('./config/swagggerConfig');

const { userRoutes, apiKeyRoutes, locationRoutes } = require('./routes/index');
const rateLimiter = require('./middleware/rateLimit');
const { infoLogger } = require('./middleware/logger');

const app = express();
const PORT = CONFIG.PORT;

// Connect to the database
dbConnection();

// Connect to Redis
redisClient.connect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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

app.get('/', (req, res) => {
	res.status(200).json({
		status: true,
		message: 'Welcome to Locale built by Edet Emmanuel Asuquo',
		data: 'Go to /api-docs to access the api documentation',
	});
});

// Start the server
app.listen(PORT, () => {
	infoLogger.info(`Server is running on port ${PORT}`);
});
