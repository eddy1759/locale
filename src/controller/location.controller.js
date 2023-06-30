const { errorLogger } = require('../middleware/logger');
const {
	getAllStates,
	getAllRegions,
	getAllLGAs,
	getStateById,
	allStatesOnly,
	allRegionsOnly,
} = require('../service/location.service');

const getStates = async (req, res) => {
	try {
		const { state_name } = req.query;

		if (state_name) {
			// Get state details by name
			const state = await getAllStates({ state_name });
			if (!state) {
				return res.status(404).json({ error: 'State not found' });
			}
			return res.status(200).json({ state });
		}

		// Get all states
		const states = await getAllStates();
		if (!states) {
			return res.status(404).json({ error: 'States not found' });
		}
		return res.status(200).json({ states });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getRegions = async (req, res) => {
	try {
		const { region_name } = req.query;

		if (region_name) {
			// Get Region details by name
			const region = await getAllRegions({ region_name });
			if (!region) {
				return res.status(404).json({ error: 'Region not found' });
			}
			return res.status(200).json({ region });
		}

		// Get all states
		const regions = await getAllRegions();
		if (!regions) {
			return res.status(404).json({ error: 'Region not found' });
		}
		return res.status(200).json({ regions });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getLGAs = async (req, res) => {
	try {
		const { lga_name } = req.query;

		if (lga_name) {
			// Get LGA details by name
			const lga = await getAllLGAs({ lga_name });
			if (!lga) {
				return res.status(404).json({ error: 'LGA not found' });
			}
			return res.status(200).json({ lga });
		}

		// Get all LGAs
		const lgas = await getAllLGAs();
		if (!lgas) {
			return res.status(404).json({ error: 'LGAs not found' });
		}
		return res.status(200).json({ lgas });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const stateById = async (req, res) => {
	try {
		const { id } = req.params;

		// Get state details by ID
		const state = await getStateById(id);
		if (!state) {
			return res.status(404).json({ error: 'State not found' });
		}
		return res.status(200).json({ state });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getAllStatesOnly = async (req, res) => {
	const states = await allStatesOnly();
	res.status(200).json({ states });
};

const getAllRegionOnly = async (req, res) => {
	const regions = await allRegionsOnly();
	res.status(200).json({ regions });
};

module.exports = {
	getRegions,
	getStates,
	getLGAs,
	stateById,
	getAllStatesOnly,
	getAllRegionOnly,
};
