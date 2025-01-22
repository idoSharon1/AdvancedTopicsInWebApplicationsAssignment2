import postModel, { IPost } from "./../db/models/PostModel.js";
import { Request, Response } from "express";
import BaseController from "./baseController.js";

class PostsController extends BaseController<IPost> {
    constructor() {
        super(postModel);
    }

    async create(req: Request, res: Response) {
        const userId = req.params.userId;
        const post = {
            ...req.body,
            owner: userId
        }
        req.body = post;
        super.create(req, res);
    };
}


export default new PostsController();