/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
const LocationModel = require('../model/Locale');
const redisClient = require('../config/redisConfig');
const CONFIG = require('../config/config');

const getAllStates = async ({ state_name, lga } = {}) => {
	try {
		const decodedStateName = decodeURIComponent(state_name || '');
		const cacheKey = `getAllStates:${decodedStateName || 'all'}`;
		let cachedStates = await redisClient.get(cacheKey);

		if (cachedStates) {
			return JSON.parse(cachedStates);
		}

		let query = {};

		if (state_name) {
			query = { state: decodedStateName };
		}

		const projection = lga === 'false' ? '-LGA' : '-__v';
		const states = await LocationModel.find(query).select(projection).exec();

		if (!states || states.length === 0) {
			return null;
		}

		const stateData = states.map((state) => {
			const { ...stateData } = state.toObject();
			return stateData;
		});

		await redisClient.set(cacheKey, JSON.stringify(stateData));
		return stateData;
	} catch (error) {
		throw error;
	}
};

const getAllRegions = async ({ region_name, lga } = {}) => {
	try {
		const decodedRegionName = decodeURIComponent(region_name || '');
		const cacheKey = `getAllRegions:${decodedRegionName || 'all'}`;
		let cachedRegions = await redisClient.get(cacheKey);

		if (cachedRegions) {
			return JSON.parse(cachedRegions);
		}
		let query = {};

		if (region_name) {
			query = { region: decodedRegionName };
		}

		const projection = lga === 'false' ? '-LGA' : '-__v';
		const regions = await LocationModel.find(query).select(projection).exec();

		if (!regions || regions.length === 0) {
			return null;
		}

		const regionData = regions.map((region) => {
			const { _id, ...regionData } = region.toObject();
			return regionData;
		});

		await redisClient.setEx(cacheKey, CONFIG.tty, JSON.stringify(regionData));

		return regionData;
	} catch (error) {
		throw error;
	}
};

const getAllLGAs = async ({ lga_name } = {}) => {
	try {
		const decodedLGAName = decodeURIComponent(lga_name || '');
		const cacheKey = `getAllLGAs:${decodedLGAName || 'all'}`;
		let cachedLGAs = await redisClient.get(cacheKey);

		if (cachedLGAs) {
			return JSON.parse(cachedLGAs);
		}

		let query = {};

		if (lga_name) {
			query = { LGA: decodedLGAName };
		}

		const lgas = await LocationModel.find(query).exec();

		if (!lgas || lgas.length === 0) {
			return null;
		}

		const lgasData = lgas.map((lga) => {
			const { _id, ...lgasData } = lga.toObject();
			return lgasData;
		});

		await redisClient.setEx(cacheKey, CONFIG.tty, JSON.stringify(lgasData));

		return lgasData;
	} catch (error) {
		throw error;
	}
};

const getStateById = async ({ id, lga } = {}) => {
	try {
		const cacheKey = `getStateById:${id}`;
		let cachedState = await redisClient.get(cacheKey);

		if (cachedState) {
			return JSON.parse(cachedState);
		}

		const projection = lga === 'false' ? '-LGA' : '-__v';
		const state = await LocationModel.findById(id).select(projection).exec();

		if (!state) {
			return null;
		}

		const stateData = { ...state._doc };

		await redisClient.setEx(cacheKey, CONFIG.tty, JSON.stringify(stateData));

		return stateData;
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
