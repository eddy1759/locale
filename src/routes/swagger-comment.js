/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Status of the login request
 *         message:
 *           type: string
 *           description: Login message
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         apiKey:
 *           type: object
 *           description: User's API key details
 *           properties:
 *             userId:
 *               type: string
 *               description: User ID
 *             apiKey:
 *               type: string
 *               description: API Key
 *
 *     Location:
 *       type: object
 *       properties:
 *         state:
 *           type: string
 *           description: State name
 *         capital:
 *           type: string
 *           description: Capital city
 *         region:
 *           type: string
 *           description: Region name
 *         metadata:
 *           type: string
 *           description: Metadata information
 *         LGA:
 *           type: string
 *           description: LGA name
 *
 *   securitySchemes:
 *     apiKeyAuth:
 *       type: apiKey
 *       in: query
 *       name: apiKey
 *       description: API Key for request authentication
 *     userAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: JWT token for user authentication
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API endpoints
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registration success message
 *       404:
 *         description: User already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User Already Exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Error status
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid username or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Error status
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: API endpoints for managing locations
 */

/**
 * @swagger
 * /location/regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Location]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Returns all regions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region:
 *                   type: string
 *                   description: Region name
 *                 state:
 *                   type: string
 *                   description: State name
 *                 capital:
 *                   type: string
 *                   description: Capital city
 *                 metadata:
 *                   type: string
 *                   description: Metadata information
 *                 LGA:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *                   description: List of Local Government Areas
 *       401:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Error status
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /location/states:
 *   get:
 *     summary: Get all states
 *     tags: [Location]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: state_name
 *         schema:
 *           type: string
 *         description: Filter states by name (optional)
 *     responses:
 *       200:
 *         description: Returns all states or a specific state if state_name is provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                   description: State name
 *                 capital:
 *                   type: string
 *                   description: Capital city
 *                 region:
 *                   type: string
 *                   description: Region name
 *                 metadata:
 *                   type: string
 *                   description: Metadata information
 *                 LGA:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *                   description: List of Local Government Areas
 *       401:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Error status
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /location/lgas:
 *   get:
 *     summary: Get all LGAs
 *     tags: [Location]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: lga_name
 *         schema:
 *           type: string
 *         description: Filter LGAs by name (optional)
 *     responses:
 *       200:
 *         description: Returns all LGAs or a specific LGA if lga_name is provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                   description: State name
 *                 capital:
 *                   type: string
 *                   description: Capital city
 *                 region:
 *                   type: string
 *                   description: Region name
 *                 metadata:
 *                   type: string
 *                   description: Metadata information
 *                 LGA:
 *                   type: string
 *                   description: LGA name
 *       401:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Error status
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /location/states/{id}:
 *   get:
 *     summary: Get state details by ID
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the state
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: State not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /location/states/all:
 *   get:
 *     summary: Get all distinct states
 *     tags:
 *       - Location
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /location/regions/all:
 *   get:
 *     summary: Get all distinct regions
 *     tags:
 *       - Location
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
