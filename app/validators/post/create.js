const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    title: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 20, max: 1000 },
    body: { type: "string", min: 255 },
    cover: { type: "string" },
    // href: { type: "email", min: 3, max: 100 },
    // status: { type: "string", enum: ["draft", "published"], default: "draft" },
    topicID: { type: "string" },
    // creator: { type: "string" },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
