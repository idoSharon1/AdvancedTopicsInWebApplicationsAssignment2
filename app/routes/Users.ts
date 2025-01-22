import express from "express";
const router = express.Router();
import commentsController from "./../controllers/commentController.js"
import { authMiddleware } from "./../controllers/authController.js";

/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments API
*/

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", authMiddleware, commentsController.create.bind(commentsController));

router.delete("/:id", authMiddleware, commentsController.deleteItem.bind(commentsController));

export default router;