import mongoose from "mongoose";

const ArticlesSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    like: { type: Number, default: 0 }, 
    comments: [{
        datePosted: { type: Date, required: true },
        commentContent: { type: String, required: true },
        commentsLikes: { type: Number, default: 0 }
    }]
});

export const ArticlesModel = mongoose.model("Articles", ArticlesSchema);
