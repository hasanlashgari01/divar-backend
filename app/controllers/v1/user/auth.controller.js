const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../../models/user");
const { BanUserModel } = require("../../../models/banUser");

const registerValidator = require("../../../validators/user/register");

exports.register = async (req, res, next) => {
    const validationResults = registerValidator(req.body);
    if (validationResults !== true) return next({ status: 422, message: validationResults });

    const { username, name, email, password, phone } = req.body;

    const isUserBan = await BanUserModel.findOne({ phone });
    if (isUserBan) return next({ status: 409, message: "کاربر بن شده است." });

    const isUserExist = await UserModel.findOne({ $or: [{ username }, { email }, { phone }] });
    if (isUserExist) return next({ status: 409, message: "کاربر وجود دارد." });

    const countOfUsers = await UserModel.count();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
        username,
        name,
        email,
        password: hashedPassword,
        phone,
        role: countOfUsers === 0 ? "ADMIN" : "USER",
    });

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password");

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

    return res.status(201).json({ user: userObject, accessToken });
};

exports.login = async (req, res, next) => {
    const { identifier, password } = req.body;

    const user = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }, { phone: identifier }],
    });
    if (!user) return next({ message: "کاربر یافت نشد." });

    const isUserBan = await BanUserModel.findOne({ phone: user.phone });
    if (isUserBan) return next({ status: 409, message: "کاربر بن شده است." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next({ message: "رمز عبور نادرست است." });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

    return res.status(200).json({ accessToken });
};

exports.getMe = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {}
};
