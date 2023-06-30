const express = require('express');
const { authenticateApiKey } = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimit');

const {
	getRegions,
	getStates,
	getLGAs,
	stateById,
	getAllStatesOnly,
	getAllRegionOnly,
} = require('../controller/location.controller');

const router = express.Router();

router.get('/regions', authenticateApiKey, rateLimiter, getRegions);
router.get('/states', authenticateApiKey, rateLimiter, getStates);
router.get('/lgas', authenticateApiKey, rateLimiter, getLGAs);
router.get('/states/all', authenticateApiKey, rateLimiter, getAllStatesOnly);
router.get('/regions/all', authenticateApiKey, rateLimiter, getAllRegionOnly);
router.get('/states/:id', authenticateApiKey, rateLimiter, stateById);

module.exports = router;
