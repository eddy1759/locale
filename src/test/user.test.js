/* eslint-disable no-undef */
const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const userModel = require('../model/User');
const ApiKeyModel = require('../model/ApiKey');
const dbConnection = require('../config/dbConfig');
const generateApiKey = require('../utils/helper');
const mongoose = require('mongoose');
const redisClient = require('../config/redisConfig');

describe('User Controller', () => {
	let user;

	beforeAll(async () => {
		await dbConnection();
		await redisClient.connect();
		await userModel.deleteMany({});
		await ApiKeyModel.deleteMany({});

		const passwordHash = await bcrypt.hash('testPassword', 10);
		user = await userModel.create({
			username: 'testUser',
			email: 'test@example.com',
			password: passwordHash,
		});

		//Create an API key for the user
		apiKey = await ApiKeyModel.create({
			userId: user._id,
			apiKey: generateApiKey(),
		});
	});

	afterAll(async () => {
		// Clean up the user and API key created for testing
		await userModel.deleteMany({});
		await ApiKeyModel.deleteMany({});
		await mongoose.connection.close();
		await redisClient.quit();
	});

	describe('POST /api/register', () => {
		test('should register a new user', async () => {
			const response = await request(app).post('/api/register').send({
				username: 'newUser',
				email: 'newuser@mail.com',
				password: 'newUserPassword',
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('message');
			expect(response.body.message).toBe('Register Successfully');
		});

		test('should return 404 if user already exists', async () => {
			const response = await request(app).post('/api/register').send({
				username: 'testUser',
				email: 'test@example.com',
				password: 'testPassword',
			});

			expect(response.status).toBe(404);
			expect(response.text).toBe('User Already Exist');
		});
	});

	describe('POST /api/login', () => {
		test('should login with valid credentials', async () => {
			const response = await request(app).post('/api/login').send({
				email: 'newuser@mail.com',
				password: 'newUserPassword',
			});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('message');
			expect(response.body).toHaveProperty('token');
			expect(response.body).toHaveProperty('apiKey');
			expect(response.body.message).toBe(
				'User logged in successfully, Save the apiKey as you will only see it once'
			);
			expect(response.body.token).toBeDefined();
			expect(response.body.apiKey).toBeDefined();
		});

		test('should return 404 if user does not exist', async () => {
			const response = await request(app).post('/api/login').send({
				email: 'nonexistent@example.com',
				password: 'testPassword',
			});

			expect(response.status).toBe(404);
			expect(response.text).toBe("User doesn't exist, Signup");
		});

		test('should return 401 if password is invalid', async () => {
			const response = await request(app).post('/api/login').send({
				email: 'test@example.com',
				password: 'invalidPassword',
			});

			expect(response.status).toBe(401);
			expect(response.text).toBe('Invalid password');
		});

		test('should return log in if apiKey exist', async () => {
			const response = await request(app).post('/api/login').send({
				email: 'newuser@mail.com',
				password: 'newUserPassword',
			});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('message');
			expect(response.body.message).toBe("You're logged in");
		});
	});
});
