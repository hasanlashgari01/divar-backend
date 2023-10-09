const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        Comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const model = mongoose.model("CommentLike", schema);

module.exports = model;
