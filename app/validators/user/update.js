const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255, optional: true, remove: true },
    email: { type: "email", max: 100, optional: true, remove: true },
    username: { type: "string", max: 100, optional: true, remove: true },
    // password: { type: "string", min: 8, max: 24, optional: true  },
    // confirmPassword: { type: "equal", field: "password", optional: true  },
    phone: { type: "string", max: 11, optional: true, remove: true },
    biography: { type: "string", optional: true, remove: true },
    gender: { type: "string", enum: ["MAN", "WOMEN", "OTHER"], optional: true, remove: true },
    telegram: { type: "string", optional: true, remove: true },
    twitter: { type: "string", optional: true, remove: true },
    linkedin: { type: "string", optional: true, remove: true },
    themeMode: { type: "string", enum: ["LIGHT", "AUTO", "DARK"], optional: true, remove: true },
    themeStatus: { type: "string", enum: ["0", "1"], optional: true },
    // $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
