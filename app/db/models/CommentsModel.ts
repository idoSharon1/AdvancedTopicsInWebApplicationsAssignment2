import mongoose from "mongoose";

interface IComment {
    postId: string,
    text: string, 
    senderId: string
}

const CommentSchema = new mongoose.Schema<IComment>({
    postId: { type: String, required: true },
    text: { type: String, required: true },
    senderId: { type: String, required: true },
});

const CommentsModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentsModel;
