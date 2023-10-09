const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
        unique: true,
    },
});

const model = mongoose.model("Topic", schema);

module.exports = { TopicModel: model };
