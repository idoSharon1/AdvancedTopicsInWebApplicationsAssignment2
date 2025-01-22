import commentsModel, { IComment } from "./../db/models/CommentsModel.js";
import { Request, Response } from "express";
import BaseController from "./baseController.js";

const commentsController = new BaseController<IComment>(commentsModel);


export default commentsController