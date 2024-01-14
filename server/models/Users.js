import mongoose, { Schema } from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {type : String, required : true, unique : true},
    password: {type : String, required : true},
    email : { type : String, required : true },
    articles : [{types : Schema.Types.ObjectId, Ref : 'Articles' }],
    profilePic : { type : Image}

})


export const UserModel = mongoose.model('User', UserSchema)