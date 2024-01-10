const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255, optional: true },
    email: { type: "email", min: 10, max: 100, optional: true },
    password: { type: "string", min: 8, max: 24, optional: true },
    confirmPassword: { type: "equal", field: "password", optional: true },
    phone: { type: "string", max: 11, optional: true },
    biography: { type: "string", min: 32, optional: true, optional: true },
    gender: { type: "string", enum: ["MAN", "WOMAN"], optional: true },
    telegram: { type: "string", min: 3, optional: true },
    twitter: { type: "string", min: 3, optional: true },
    linkedin: { type: "string", min: 3, optional: true },
    $$strict: true,
};

const nameSchema = {
    name: { type: "string", min: 3, max: 255, optional: true },
};

const check = v.compile(schema);
const nameCheck = v.compile(nameSchema);

module.exports = { nameCheck };
