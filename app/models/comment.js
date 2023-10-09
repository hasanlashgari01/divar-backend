const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAccepted: {
            type: Number,
            default: 0,
        },
        isAnswer: {
            type: Number,
            required: true,
            default: 0,
        },
        mainCommentID: {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    },
    { timestamps: true }
);

const model = mongoose.model("Comment", schema);

module.exports = { CommentModel: model };
