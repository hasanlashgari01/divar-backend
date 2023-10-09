const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        phone: { type: "string", max: 11 },
    },
    { timestamps: true }
);

const model = mongoose.model("Ban", schema);

module.exports = { BanUserModel: model };
