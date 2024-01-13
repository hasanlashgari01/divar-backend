const Validator = require("fastest-validator");

const v = new Validator();

const registerSchema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    identifier: { type: "email" },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    phone: { type: "string", max: 11 },
    $$strict: true,
};

const loginSchema = {
    identifier: { type: "email" },
    password: { type: "string", min: 8, max: 24 },
    $$strict: true,
};

const loginCheck = v.compile(loginSchema);
const registerCheck = v.compile(registerSchema);

module.exports = { loginCheck, registerCheck };
