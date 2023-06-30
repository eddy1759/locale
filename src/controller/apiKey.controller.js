const generateAPIKEY = require('../utils/helper');
const { APIKeyModel } = require('../model/ApiKey');
const { errorLogger } = require('../middleware/logger');

const generateApiKey = async (req, res) => {
	try {
		const { userId } = req;

		const apiKey = generateAPIKEY();

		const apiKeyExist = await APIKeyModel.findOne({ userId });
		if (apiKeyExist) {
			return res.status(404).json("'User  with API key exist'");
		}
		const newAPIKey = new APIKeyModel({ userId: req.userId, apiKey: apiKey });
		await newAPIKey.save();

		return res.status(201).json({ apiKey });
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

const deleteApiKey = async (req, res) => {
	try {
		const { userId } = req;
		// Delete API key logic
		await APIKeyModel.findOneAndDelete({ userId });

		return res.status(200).json({ message: 'API key deleted' });
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

module.exports = {
	generateApiKey,
	deleteApiKey,
};
