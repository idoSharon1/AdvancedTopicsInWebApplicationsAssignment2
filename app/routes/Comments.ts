import express, { Request, Response } from 'express';
import CommentsModel from '../db/models/CommentsModel.js'

const commentsRouter = express.Router();

// Create: Add a New comment
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

// Read: Get a Comment by ID
commentsRouter.get('/:id', async (req: Request, res: Response) => {
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