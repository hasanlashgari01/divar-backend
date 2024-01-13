const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const { UserModel } = require("../models/user");

exports.checkExist = (identifier, next) => {
    if (!isValidObjectId(identifier)) return next({ status: 404, message: "شناسه مورد نظر یافت نشد." });
};

exports.sendOtp = async userId => {
    const now = new Date().getTime();
    const otp = {
        code: crypto.randomInt(100000, 999999),
        expiresIn: now + 1000 * 60 * 2, // 2 min
    };

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, { otp });

    return otp.code;
};

exports.sendEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "hasanlashgari01@gmail.com",
            pass: "kpvv ctuq uubs byka",
        },
    });

    const mailOptions = {
        from: "hasanlashgari01@gmail.com",
        to: email,
        subject: "کد ورود شما به ویرگول",
        text: String(code),
    };

    transporter.sendMail(mailOptions).catch(err => err);
};

// ! // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE1MzY4YjZjODI4ZTdhNDNkYjFjYyIsImlhdCI6MTY5NjY4MzA2NiwiZXhwIjoxNjk5Mjc1MDY2fQ.3cwDjlELVRS29V_kLTPu4WVj8qs4B2Qce8DIEZZczxk
// * // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE1NDczNDBhYTU4ZGUxZGE1ZDc0YSIsImlhdCI6MTY5NjY4MzEyMywiZXhwIjoxNjk5Mjc1MTIzfQ.m_joOL-zbDefPLwDhp2KCHvo3yK-gmifYXUtGmEurWA
// ? saeedi rad // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE3MzM2OGI2NmM3YWQxZDVjZTViZSIsImlhdCI6MTY5NjY5MDk5OCwiZXhwIjoxNjk5MjgyOTk4fQ.YDpKhNlYujGyYlah6A1x2BHxCO-grE1GbGurd7WV5KQ
