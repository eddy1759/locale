const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
	generateApiKey,
	deleteApiKey,
} = require('../controller/apiKey.controller');

const router = express.Router();

router.get('/', authenticateUser, generateApiKey);
router.delete('/', authenticateUser, deleteApiKey);

module.exports = router;
