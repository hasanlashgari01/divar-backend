const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        bookmarkList: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const model = mongoose.model("PostBookmark", schema);

module.exports = { PostBookmarksModel: model };
