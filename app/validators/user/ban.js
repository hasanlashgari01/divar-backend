const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    phone: { type: "string", max: 11 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
