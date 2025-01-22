//gal-yaakov-323858381-ido-sharon-324182716

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './app/db/mongoHandler.js';
import postRouter from './app/routes/Post.js';
import commentsRouter from './app/routes/Comments.js';
import config from './app/config/config.js';
import dotenv from 'dotenv'

dotenv.config();

console.log(process.env.MONGO_CONNECTION_STRING)

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/Post', postRouter);
app.use('/Comment', commentsRouter);

// Start server
app.listen(config().app.appPort, () => {
    console.log(`API server running on http://localhost:${config().app.appPort}`);
});