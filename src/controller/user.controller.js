const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../model/User');
const APIKeyModel = require('../model/ApiKey');

const generateAPIKEY = require('../utils/helper');
const CONFIG = require('../config/config');
const { errorLogger } = require('../middleware/logger');

const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(404).send('User Already Exist');
		}
		const user = await UserModel.create({
			username,
			email,
			password,
		});
		await user.save();
		return res.status(201).json({ message: 'Register Successfully' });
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).send("User doesn't exist, Signup");
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).send('Invalid password');
		}
		const userApiKey = await APIKeyModel.findOne({ userId: user._id });

		if (userApiKey) {
			return res.status(200).json({ message: "You're logged in" });
		}

		const api_key = generateAPIKEY();

		const apiKey = await APIKeyModel.create({
			userId: user._id,
			apiKey: api_key,
		});
		await apiKey.save();
		user.apiKeyId = apiKey._id;

		await user.save();

		const token = jwt.sign({ userId: user._id }, CONFIG.SECRET, {
			expiresIn: CONFIG.expiresIn,
		});

		req.session.token = token;

		return res.status(200).json({
			status: true,
			message:
				'User logged in successfully, Save the apiKey as you will only see it once',
			token: token,
			apiKey: apiKey,
		});
	} catch (error) {
		errorLogger.error(error);
		return res
			.status(500)
			.json({ status: false, error: 'Internal server error' });
	}
};

module.exports = { registerUser, loginUser };
