//gal-yaakov-323858381-ido-sharon-324182716

// Done : add swagger docs in the comments router
// Done : add swagger docs in the auth router
// Done : update rest.rest file
// TODO : add jest to the project
// TODO : check if i did anything he wanted
// TODO : try to fix that .js import maybe cannot work without it for some reason

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './app/db/mongoHandler.js';
import postRouter from './app/routes/Post.js';
import commentsRouter from './app/routes/Comments.js';
import userRouter from './app/routes/Users.js';
import config from './app/config/config.js';
import dotenv from 'dotenv'
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

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
app.use('/auth', userRouter)

// Swagger
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web Dev 2025 REST API Assigment",
        version: "1.0.0",
        description: "Ido & Gal.",
      },
      servers: [{ url: `http://localhost:${config().app.appPort}`, },],
    },
    apis: ["./app/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Start server
app.listen(config().app.appPort, () => {
    console.log(`API server running on http://localhost:${config().app.appPort}`);
});