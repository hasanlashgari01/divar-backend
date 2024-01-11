const bcrypt = require("bcrypt");
const { UserModel } = require("../../../models/user");
const { PostModel } = require("../../../models/post");
const updateUserValidator = require("../../../validators/user/update");

exports.getProfile = async (req, res, next) => {
    try {
        res.send({ email: req.user.username });
    } catch (error) {
        next(error);
    }
};

exports.getDetails = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
};

exports.updateDetails = async (req, res, next) => {
    try {
        const validationResults = updateUserValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        let hashedPassword;
        const { name, password, biography, gender, telegram, twitter, linkedin } = req.body;
        if (password) hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.findOneAndUpdate(
            { _id: req.user._id },
            { name, password: hashedPassword, biography, gender, telegram, twitter, linkedin }
        );

        const userObject = user.toObject();
        Reflect.deleteProperty(userObject, "password");

        res.status(201).json({ status: "ok", message: "اطلاعات شما آپدیت شد." });
    } catch (error) {
        next(error);
    }
};

exports.viewProfile = async (req, res, next) => {
    try {
        const { username } = req.params;

        const findUser = await UserModel.findOne({ username })
            .select("avatar name biography telegram twitter linkedin createdAt")
            .lean();
        const postsOfUser = await PostModel.find({ author: findUser._id })
            .select("-body -author -__v")
            .populate("topicID", "-__v");
        const publishedPostsOfUser = await postsOfUser.filter(post => post.status === "published");

        res.json({ findUser, postsOfUser, publishedPostsOfUser });
    } catch (error) {}
};
