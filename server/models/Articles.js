import mongoose, { Schema } from "mongoose";

const CommentSchema = mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref:'user', required: true },
    datePosted: { type: Date, required: true },
    commentContent: { type: String, required: true },
    commentsLikes: { type: Number, default: 0 }
})

const ArticleSchema = mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref:'user', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    datePosted: { type: Date, required: true },
    views: { type: Number, default: 0 },
    like: { type: Number, default: 0 }, 
    shared: { type: Number, default: 0},
    comments: [ CommentSchema ]
}); 

export const ArticleModel = mongoose.model("article", ArticleSchema);
