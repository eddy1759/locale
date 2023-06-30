/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
const LocationModel = require('../model/Locale');
const redisClient = require('../config/redisConfig');
const CONFIG = require('../config/config');

const getAllStates = async ({ state_name } = {}) => {
	try {
		const decodedStateName = decodeURIComponent(state_name);
		const cacheKey = `getAllStates:${decodedStateName || 'all'}`;
		let cachedStates = await redisClient.get(cacheKey);

		let region, state, capital, metadata, LGA;

		if (!cachedStates) {
			let query = {};

			if (state_name) {
				query = { state: decodedStateName };
			}

			const states = await LocationModel.find(query).exec();

			const { __v, ...stateData } = states[0]._doc;
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;

			if (states && states.length > 0) {
				await redisClient.set(cacheKey, JSON.stringify(stateData));
			}
		} else {
			const stateData = JSON.parse(cachedStates);
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;
		}

		return { region, state, capital, metadata, LGA };
	} catch (error) {
		throw error;
	}
};

const getAllRegions = async ({ region_name } = {}) => {
	try {
		const decodedRegionName = decodeURIComponent(region_name);
		const cacheKey = `getAllRegions:${decodedRegionName || 'all'}`;
		let cachedRegions = await redisClient.get(cacheKey);

		let region, state, capital, metadata, LGA;

		if (!cachedRegions) {
			let query;

			if (region_name) {
				query = { region: decodedRegionName };
			}
			const regions = await LocationModel.find(query).exec();
			const { __v, ...stateData } = regions[0]._doc;
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;

			if (regions && regions.length > 0) {
				await redisClient.setEx(
					cacheKey,
					CONFIG.tty,
					JSON.stringify(stateData)
				);
			}
		} else {
			const stateData = JSON.parse(cachedRegions);
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;
		}
		return { region, state, capital, metadata, LGA };
	} catch (error) {
		throw error;
	}
};

const getAllLGAs = async ({ lga_name } = {}) => {
	try {
		const decodedLGAName = decodeURIComponent(lga_name);
		const cacheKey = `getAllLGAs:${decodedLGAName || 'all'}`;
		let cachedLGAs = await redisClient.get(cacheKey);

		let region, state, capital, metadata, LGA;

		if (!cachedLGAs) {
			let query;

			if (lga_name) {
				query = { LGA: decodedLGAName };
			}

			const lgas = await LocationModel.find(query).exec();
			const { __v, ...stateData } = lgas[0]._doc;
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;

			if (lgas && lgas.length > 0) {
				await redisClient.setEx(
					cacheKey,
					CONFIG.tty,
					JSON.stringify(stateData)
				);
			}
		} else {
			const stateData = JSON.parse(cachedLGAs);
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;
		}

		return { region, state, capital, metadata, LGA };
	} catch (error) {
		throw error;
	}
};

const getStateById = async (id) => {
	try {
		const cacheKey = `getStateById:${id}`;
		let cachedState = await redisClient.get(cacheKey);

		let region, state, capital, metadata, LGA;

		if (!cachedState) {
			const states = await LocationModel.findById(id).exec();

			const { __v, ...stateData } = states[0]._doc;
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;

			if (states && _states.length > 0) {
				await redisClient.setEx(
					cacheKey,
					CONFIG.tty,
					JSON.stringify(stateData)
				);
			}
		} else {
			const stateData = JSON.parse(cachedStates);
			region = stateData.region;
			state = stateData.state;
			capital = stateData.capital;
			metadata = stateData.metadata;
			LGA = stateData.LGA;
		}
		return { region, state, capital, metadata, LGA };
	} catch (error) {
		throw error;
	}
};

const allStatesOnly = async () => {
	const states = await LocationModel.distinct('state');
	return states;
};

const allRegionsOnly = async () => {
	const regions = await LocationModel.distinct('region');
	return regions;
};

module.exports = {
	getAllStates,
	getAllRegions,
	getAllLGAs,
	getStateById,
	allStatesOnly,
	allRegionsOnly,
};
