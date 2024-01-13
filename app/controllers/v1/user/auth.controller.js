const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../../models/user");
const { BanUserModel } = require("../../../models/banUser");
const { sendOtp } = require("../../../utils/funcs");

const { registerCheck } = require("../../../validators/user/auth");
const { loginCheck } = require("../../../validators/user/auth");

exports.accessRegister = async (req, res, next) => {
    const validationResults = registerCheck(req.body);
    if (validationResults !== true) return next({ status: 422, message: validationResults });

    const { username, name, identifier, password, phone } = req.body;

    const isUserExist = await UserModel.findOne({ $or: [{ username }, { email: identifier }, { phone }] });
    if (isUserExist) return next({ status: 409, message: "کاربر وجود دارد." });

    const isUserBan = await BanUserModel.findOne({ phone });
    if (isUserBan) return next({ status: 409, message: "کاربر بن شده است." });

    const countOfUsers = await UserModel.count();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
        username,
        name,
        email: identifier,
        password: hashedPassword,
        phone,
        role: countOfUsers === 0 ? "ADMIN" : "USER",
        otp: { code: "", expiresIn: "" },
    });

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password");

    await sendOtp(user._id);

    res.status(200).json({ status: 200, message: "کد ارسال شد." });
};

exports.register = async (req, res, next) => {
    try {
        const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

        res.status(200).json({ user: req.user, accessToken });
    } catch (error) {
        next(error);
    }
};

exports.accessLogin = async (req, res, next) => {
    const validationResults = loginCheck(req.body);
    if (validationResults !== true) return next({ status: 422, message: validationResults });

    const { identifier, password } = req.body;

    // $or: [{ username: identifier }, { email: identifier }, { phone: identifier }],
    const user = await UserModel.findOne({ email: identifier });
    if (!user) return res.status(500).json({ status: 500, message: "کاربر یافت نشد." });

    const isUserBan = await BanUserModel.findOne({ phone: user.phone });
    if (isUserBan) return res.status(500).json({ status: 409, message: "کاربر بن شده است." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(500).json({ status: 500, message: "رمز عبور نادرست است." });
    await sendOtp(user._id);
    // sendEmail(identifier, code);

    res.status(200).json({ status: 200, message: "کد ارسال شد." });
};

exports.login = async (req, res, next) => {
    try {
        const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

        res.status(200).json({ user: req.user, accessToken });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
};
