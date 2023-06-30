const express = require('express');
const { registerUser, loginUser } = require('../controller/user.controller');
const {
	validateRegisterUser,
	validateLoginUser,
} = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);

module.exports = router;
