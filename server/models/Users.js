import mongoose, { Schema } from "mongoose";

const SocialsLinkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required:true }
})

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userDescription : { type: String, default:"" },
    password: { type: String, required: true },
    socials: [ SocialsLinkSchema ],
    email: { type: String, required: true },
    profilePic: { type: String, default:"" },
    articles: [{ type: Schema.Types.ObjectId, ref: "article" }], 
    likedArticles: [{ type: Schema.Types.ObjectId, ref: "article" }],
    followed: [{ type: Schema.Types.ObjectId, ref: "user" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

export const UserModel = mongoose.model('user', UserSchema);
