const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        likeList: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const model = mongoose.model("PostLike", schema);

module.exports = { PostLikesModel: model };
