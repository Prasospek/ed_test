import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,       // [] arary of strings ale toto je vice efficient
        of: Boolean,    // check if userID exists in this map
    },
    comments: {
        type: Array,
        default: [],
    },

}, { timestamps: true });


const Post = mongoose.model("Post", postSchema);

export default Post;