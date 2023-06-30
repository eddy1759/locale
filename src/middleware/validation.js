const Joi = require('joi');

// Validation schema for registerUser route
const registerUserSchema = Joi.object({
	username: Joi.string().required().trim(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

// Validation middleware for registerUser route
const validateRegisterUser = (req, res, next) => {
	const { error } = registerUserSchema.validate(req.body);
	if (error) {
		return res.status(404).json({ error: error.details[0].message });
	}
	next();
};

// Validation schema for loginUser route
const loginUserSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

// Validation middleware for loginUser route
const validateLoginUser = (req, res, next) => {
	const { error } = loginUserSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

module.exports = { validateRegisterUser, validateLoginUser };
