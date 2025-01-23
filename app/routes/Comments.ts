import express, { Request, Response } from 'express';
import CommentsModel from '../db/models/CommentsModel.js'

const commentsRouter = express.Router();

// swagger title
/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments routes
*/

//swagger Comments schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Comments:
 *       type: object
 *       required:
 *         - postId
 *         - text
 *         - senderId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         postId:
 *           type: string
 *           description: The postId of the post
 *         text:
 *           type: string
 *           description: The text of the comment
 *         senderId:
 *           type: string
 *           description: The owner senderId of the comment
 *       example:
 *         _id: 245234t234234r234r23f4
 *         postId: 3242d5tbfg4yt4r4by45tbv45by
 *         text: My First Comment on a Post.
 *         senderId: 324vt23r4tr234t245tbv45by
 */

// Create: Add a New comment
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment on a post
 *     description: Create a new comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The postId of the comment
 *               text:
 *                 type: string
 *                 description: The text of the comment
 *               senderId:
 *                 type: string
 *                 description: The senderId of the comment
 *             required:
 *               - title
 *               - content
 *               - senderId
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentsRouter.post('/New', async (req: Request, res: Response) => {
    try {
        const { postId, text, senderId } = req.body; //Body Schema
        if (!postId || !text || !senderId) { //Check if schma is valid
            return res.status(400).json({ error: 'postId text and senderId is required' });
        }

        const newComment = new CommentsModel({ postId, text, senderId });
        res.status(201).json(await newComment.save());
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Read: Get All Comments
/**
 * @swagger
 * /comments/all:
 *   get:
 *     summary: Get a all comments
 *     description: Get a all comments
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: All comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentsRouter.get('/all', async (req: Request, res: Response) => {
    try {
        const items = await CommentsModel.find();
        res.json(items);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }});

// Read: Get a Comments of a post by postID
/**
 * @swagger
 * /comments/{postID}:
 *   get:
 *     summary: Get a comments on a post by postID
 *     description: Get a comments on a post by postID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       201:
 *         description: Comments on a post 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentsRouter.get('/:postID', async (req: Request, res: Response) => {
    try {
        const post = await CommentsModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(post);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Read: Get Comment by Sender
/**
 * @swagger
 * /comments/senderId/{senderId}:
 *   get:
 *     summary: Get a all comments of user by senderId
 *     description: Get a all comments of user by senderId
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a user
 *     responses:
 *       201:
 *         description: User comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentsRouter.get('/senderId/:senderId', async (req: Request, res: Response) => {
    try {
        const Posts = await CommentsModel.find({senderId: req.params.senderId});
        if (!Posts) {
            return res.status(404).json({ error: 'Posts not found' });
        }
        res.json(Posts);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Update: Update an item by ID
/**
 * @swagger
 * /comments/{Id}:
 *   put:
 *     summary: Update a comment by ID 
 *     description: Update a comment by ID 
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The new text of the comment
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Update user comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentsRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const updatedItem = await CommentsModel.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});


export default commentsRouter;