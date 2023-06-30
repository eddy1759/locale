const { v4: uuidv4 } = require('uuid');

const generateAPIKEY = () => {
	const apiKey = uuidv4();
	return apiKey;
};

module.exports = generateAPIKEY;
