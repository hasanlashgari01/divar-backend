const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

module.exports = async (req, res, next) => {
    const authHeader = req.header("Authorization")?.split(" ");

    if (authHeader?.length != 2) return next({ status: 403, message: "شما اجازه دسترسی به این مسیر را ندارید." });

    const token = authHeader[1];

    try {
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(jwtPayload.id).select("-__v").lean();

        Reflect.deleteProperty(user, "password");

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
