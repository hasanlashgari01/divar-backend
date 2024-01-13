const { UserModel } = require("../models/user");

exports.verifiedOtp = async (req, res, next) => {
    const { identifier, code } = req.body;

    const now = new Date().getTime();
    const user = await UserModel.findOne({ email: identifier }).lean();

    if (req.path == "/register" && (user?.otp?.expiresIn < now || user?.otp?.code !== code)) {
        await UserModel.deleteOne({ email: identifier });
        return res.status(500).json({ status: 500, message: "زمان کد به اتمام رسیده است." });
    }

    if (user.otp.expiresIn < now) res.status(500).json({ status: 500, message: "زمان کد به اتمام رسیده است." });
    if (user?.otp?.code !== code) res.status(500).json({ status: 500, message: "کد صحیح نیست." });

    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "otp");

    req.user = user;

    next();
};
