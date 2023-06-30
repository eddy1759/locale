const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.3',
		info: {
			title: 'Locale API',
			version: '1.0.0',
			description:
				'Locale is a developer tool for anyone who needs to know Nigeria, geographically at least. Locale API shows you all of Nigeria regions, states, and local government areas(LGAs).',
		},
		components: {
			securitySchemes: {
				userAuth: {
					type: 'jwt token',
					in: 'session',
					name: 'jwt token',
					description: 'JWT token for user authentication',
				},
				apiKeyAuth: {
					type: 'apiKey',
					in: 'query',
					name: 'apiKey',
					description: 'API Key for request authentication',
				},
			},
		},
		security: [
			{
				apiKeyAuth: [],
			},
		],
	},
	apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
