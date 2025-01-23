import express from "express";
const router = express.Router();
import "./../controllers/authController.js"
import authController from "./../controllers/authController.js";
import { authMiddleware } from "@app/utils/auth.js";

/**
* @swagger
* tags:
*   name: User
*   description: The Users routes
*/

//swagger User schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         refreshToken:
 *           type: string[]
 *           description: The refresh token for auth
 *       example:
 *         _id: 245234t245dsf3423
 *         email: user@gmail.com
 *         password: ssssaaaa1122
 *         refreshToken: ???refreshToken???
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all usres
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get("/all", authController.getAllUsers.bind(authController));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by email
 *     description: Get user by email
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get("/:id", authController.getUserById.bind(authController));

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: register to the api
 *     description: Create new user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/register", authMiddleware, authController.register.bind(authController));

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login to the api with email and pasword
 *     description: login to the api with email and pasword
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User loged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/login", authMiddleware, authController.login.bind(authController));

/**
 * @swagger
 * /user/logout:
 *   delete:
 *     summary: login to the api with email and pasword
 *     description: login to the api with email and pasword
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: refreshToken
 *             required:
 *               - refreshToken
 *     responses:
 *       201:
 *         description: User loged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.delete("/logout", authMiddleware, authController.logout.bind(authController));

export default router;