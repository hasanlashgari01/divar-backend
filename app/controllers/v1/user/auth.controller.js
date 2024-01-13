const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../../models/user");
const { BanUserModel } = require("../../../models/banUser");
const { saveOtpToDB, verifiedOtp } = require("../../../utils/funcs");

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

exports.accessLogin = async (req, res, next) => {
    const { identifier, password } = req.body;

    // $or: [{ username: identifier }, { email: identifier }, { phone: identifier }],
    const user = await UserModel.findOne({ email: identifier, password });
    if (!user) return next({ message: "کاربر یافت نشد." });

    const isUserBan = await BanUserModel.findOne({ phone: user.phone });
    if (isUserBan) return next({ status: 409, message: "کاربر بن شده است." });

    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if (!isPasswordCorrect) return next({ message: "رمز عبور نادرست است." });

    const code = await saveOtpToDB(user._id);

    userInfo = user;

    console.log(code);

    // sendEmail(identifier, code);

    res.status(200).json({ message: "کد ارسال شد." });
};

exports.login = async (req, res, next) => {
    try {
        const { identifier, code } = req.body;
        const user = await verifiedOtp(identifier, code);
        if (!user) return next({ message: "کاربر یافت نشد." });

        if (user == "code") res.status(500).json({ status: 500, message: "کد صحیح نیست." });
        if (user == "expiresIn") res.status(500).json({ status: 500, message: "زمان کد به اتمام رسیده است." });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

        return res.status(200).json({ accessToken });
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
