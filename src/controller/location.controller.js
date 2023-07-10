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
		const { state_name, lga } = req.query;

		if (state_name) {
			// Get state details by name
			const state = await getAllStates({ state_name, lga });
			if (!state || state.length === 0) {
				return res.status(404).json({ error: 'State not found' });
			}

			const {
				_id,
				region,
				state: stateName,
				capital,
				metadata,
				LGA,
			} = state[0];
			const response = { _id, region, state: stateName, capital, metadata };
			if (lga !== 'false') {
				response.lga = LGA;
			}
			return res.status(200).json({ status: true, state: response });
		}

		// Get all states
		const states = await getAllStates({ lga });
		if (!states || states.length === 0) {
			return res.status(404).json({ error: 'States not found' });
		}

		const formattedStates = states.map((state) => {
			const { _id, region, state: stateName, capital, metadata, LGA } = state;
			const response = { _id, region, state: stateName, capital, metadata };
			if (lga !== 'false') {
				response.lga = LGA;
			}

			return response;
		});

		return res.status(200).json({ status: true, states: formattedStates });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getRegions = async (req, res) => {
	try {
		const { region_name, lga } = req.query;

		if (region_name) {
			// Get Region details by name
			const region = await getAllRegions({ region_name, lga });
			if (!region || region.length === 0) {
				return res.status(404).json({ error: 'Region not found' });
			}

			const formattedRegion = region.map((regionData) => {
				const {
					region: regionName,
					state,
					capital,
					metadata,
					LGA,
				} = regionData;
				const response = { region: regionName, state, capital, metadata };
				if (lga !== 'false') {
					response.lga = LGA;
				}
				return response;
			});

			return res.status(200).json({ status: true, region: formattedRegion });
		}

		// Get all states
		const regions = await getAllRegions({ lga });

		if (!regions || regions.length === 0) {
			return res.status(404).json({ error: 'Region not found' });
		}

		const formattedRegions = regions.reduce((accumulator, region) => {
			const { region: regionName, state, capital, metadata, LGA } = region;
			const response = { region: regionName, state, capital, metadata };
			if (lga !== 'false') {
				response.lga = LGA;
			}
			accumulator.push(response);
			return accumulator;
		}, []);
		return res.status(200).json({ status: true, regions: formattedRegions });
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
			if (!lga || lga.length === 0) {
				return res.status(404).json({ error: 'LGA not found' });
			}
			return res.status(200).json({ lga });
		}

		// Get all LGAs
		const lgas = await getAllLGAs();
		if (!lgas || lgas.length === 0) {
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
		const { lga } = req.query;

		// Get state details by ID
		const state = await getStateById({ id, lga });
		console.log(state);
		if (!state) {
			return res.status(404).json({ error: 'State not found' });
		}

		const { _id, region, state: stateName, capital, metadata, LGA } = state;
		const response = { _id, region, state: stateName, capital, metadata };
		if (lga !== 'false') {
			response.lga = LGA;
		}

		return res.status(200).json({ status: true, state: response });
	} catch (error) {
		errorLogger.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getAllStatesOnly = async (req, res) => {
	const states = await allStatesOnly();
	res.status(200).json({ status: true, states: states });
};

const getAllRegionOnly = async (req, res) => {
	const regions = await allRegionsOnly();
	res.status(200).json({ status: true, regions: regions });
};

module.exports = {
	getRegions,
	getStates,
	getLGAs,
	stateById,
	getAllStatesOnly,
	getAllRegionOnly,
};
