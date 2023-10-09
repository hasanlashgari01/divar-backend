const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userList: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const model = mongoose.model("Followers", schema);

module.exports = { FollowersModel: model };
