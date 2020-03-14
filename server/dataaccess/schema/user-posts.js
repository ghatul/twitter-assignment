const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userComments = new Schema({
    userId: {
        type: String,
        required: true
    },
    commentInfo: {
        type: String,
        required: true
    },
    likes: [],
    comments: [
        {
            userId: {
                type: String,
                required: true
            },
            commentInfo: {
                type: String,
                required: true
            },
            comments: [],
            likes: [],
        }
    ],
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    }
})

const userPosts = new Schema({
    userId: {
        type: String,
        required: true
    },
    postInfo: {
        type: String,
        required: true
    },
    comments: [userComments],
    likes: [],
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    userInfo: { type: Schema.Types.ObjectId, ref: 'MyUser' }
});

const userPostsModel = mongoose.model("userPosts", userPosts);

module.exports = userPostsModel;
