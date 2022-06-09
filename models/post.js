

import mongoose from "mongoose";


const postSchema  = mongoose.Schema({
    postText:String,
    time: {
        type:String,
        default:Date.now()
    }
})

const post = mongoose.model("post", postSchema );
export default post;