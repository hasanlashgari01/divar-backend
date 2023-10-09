const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    email: { type: "email", min: 10, max: 100 },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    phone: { type: "string", max: 11 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
