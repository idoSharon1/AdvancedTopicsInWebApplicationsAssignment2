import mongoose from "mongoose";

export interface IPost{
    title: string,
    description: string, 
    senderId: string
}


const PostSchema = new mongoose.Schema<IPost>({  // The post ID is generate by the mongoDB
    title: { type: String, required: true },
    description: { type: String, required: true },
    senderId: { type: String, required: true },
});

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;