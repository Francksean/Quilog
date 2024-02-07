import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    datePosted: { type: Date, required: true },
    commentContent: { type: String, required: true },
    commentsLikes: { type: Number, default: 0 }
})

const ArticlesSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    like: { type: Number, default: 0 }, 
    shared: { type: Number, default: 0},
    comments: [ CommentSchema ]
});

export const ArticlesModel = mongoose.model("articles", ArticlesSchema);
