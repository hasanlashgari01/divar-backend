const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
        },
        biography: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["MAN", "WOMAN", "OTHER"],
        },
        themeMode: { type: String, enum: ["DARK", "LIGHT", "AUTO"] },
        themeStatus: { type: String, default: "1" },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },
        telegram: {
            type: String,
        },
        twitter: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        otp: {
            code: {
                type: String,
            },
            expiresIn: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

const model = mongoose.model("User", schema);

module.exports = { UserModel: model };
