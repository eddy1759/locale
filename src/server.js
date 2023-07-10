const app = require('./app');
const CONFIG = require('./config/config');
const { infoLogger } = require('./middleware/logger');
const PORT = CONFIG.PORT;

// Start the server
app.listen(PORT, () => {
	infoLogger.info(`Server is running on port ${PORT}`);
});
