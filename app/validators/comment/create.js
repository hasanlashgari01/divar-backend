const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    body: { type: "string", min: 3 },
    post: { type: "string", min: 3, max: 255 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
