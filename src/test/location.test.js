/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const userModel = require('../model/User');
const ApiKeyModel = require('../model/ApiKey');
const dbConnection = require('../config/dbConfig');
const generateApiKey = require('../utils/helper');
const mongoose = require('mongoose');
const redisClient = require('../config/redisConfig');

describe('Location API', () => {
	let apiKey;
	let user;
	let region_name = 'South South';
	let wrong_region = 'wrong region';
	let state_name = 'Akwa Ibom';
	let wrong_state = 'Nigeria';

	beforeAll(async () => {
		await dbConnection();
		await redisClient.connect();
		await userModel.deleteMany({});
		await ApiKeyModel.deleteMany({});

		user = await userModel.create({
			username: 'testUser',
			email: 'test@example.com',
			password: 'testPassword',
		});

		//Create an API key for the user
		apiKey = await ApiKeyModel.create({
			userId: user._id,
			apiKey: generateApiKey(),
		});
	});

	afterAll(async () => {
		// clean up the user and API key created for testing
		await userModel.deleteMany({});
		await ApiKeyModel.deleteMany({});
		await mongoose.connection.close();
		await redisClient.quit();
	});

	describe('GET /api/locations/states/all', () => {
		it('should get list of states only', async () => {
			const response = await request(app).get(
				`/api/locations/states/all?apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status');
			expect(response.body).toHaveProperty('states');
			expect(response.body.status).toBe(true);
			expect(response.body.states).toBeDefined();
		});
	});

	describe('GET /api/locations/regions/all', () => {
		it('should get list of regions only', async () => {
			const response = await request(app).get(
				`/api/locations/regions/all?apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status');
			expect(response.body).toHaveProperty('regions');
			expect(response.body.status).toBe(true);
			expect(response.body.regions).toBeDefined();
		});
	});

	describe('GET /api/locations/states', () => {
		it('should get all of states', async () => {
			const response = await request(app).get(
				`/api/locations/states?apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status');
			expect(response.body).toHaveProperty('states');
			expect(response.body.status).toBe(true);
			expect(response.body.states).toBeDefined();
			expect(Array.isArray(response.body.states)).toBe(true);
			expect(response.body.states.length).toBeGreaterThan(0);
		});

		it('should return a particular state', async () => {
			const response = await request(app).get(
				`/api/locations/states?state_name=${state_name}&apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status');
			expect(response.body).toHaveProperty('state');
			expect(response.body.status).toBe(true);
			expect(response.body.state).toBeDefined();
			expect(response.body.state.capital).toBe('Uyo');
		});

		it('should return 404 if no state exist', async () => {
			const response = await request(app).get(
				`/api/locations/states?state_name=${wrong_state}&apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty('error');
			expect(response.body.error).toBe('State not found');
		});
	});

	describe('GET /api/locations/region', () => {
		it('hould get all state in a particular region', async () => {
			const response = await request(app).get(
				`/api/locations/regions?region_name=${region_name}&apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status');
			expect(response.body).toHaveProperty('region');
			expect(response.body.status).toBe(true);
			expect(response.body.region).toBeDefined();
			expect(Array.isArray(response.body.region)).toBe(true);
			expect(response.body.region.length).toBeGreaterThan(0);
		});

		it('should return 404 if no region exist', async () => {
			const response = await request(app).get(
				`/api/locations/regions?region_name=${wrong_region}&apiKey=${apiKey.apiKey}`
			);

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty('error');
			expect(response.body.error).toBe('Region not found');
		});
	});
});
