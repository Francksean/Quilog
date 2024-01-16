import mongoose, { Schema } from "mongoose";


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    articles: [{ type: Schema.Types.ObjectId, ref: "articles" }], 
    profilePic: { type: String }
});

export const UserModel = mongoose.model('user', UserSchema);
