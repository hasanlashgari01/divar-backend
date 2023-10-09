const { isValidObjectId } = require("mongoose");
const { FollowersModel } = require("../../../models/follow");

exports.following = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه کاربر معتبر نیست." });

    const isExistUser = await FollowersModel.findOne({ user: id });
    if (!isExistUser) {
        const userFollow = await FollowersModel.create({ user: id, userList: [req.user._id] });
    } else {
        const userFollow = await FollowersModel.updateOne({ user: id, $push: { userList: req.user._id } });
    }

    res.status(201).json({ message: "کاربر مورد نظر رو فالو کردید." });
};

exports.unfollow = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه کاربر معتبر نیست." });

    const userFollow = await FollowersModel.updateOne({ user: id, $pull: { userList: req.user._id } });

    res.status(201).json({ message: "کاربر مورد نظر رو آنفالو کردید." });
};

exports.getFollowers = async (req, res, next) => {
    const { id } = req.params;

    const followers = await FollowersModel.findOne({ user: id }).populate("userList", "name createdAt").lean();

    res.send(followers);
};

exports.getYourFollowers = async (req, res, next) => {
    const { id } = req.params;

    const findFollows = await FollowersModel.find({ userList: id }, "-__v").populate("user", "name createdAt").lean();
    const follows = findFollows.map(follow => follow.user);

    res.send(follows);
};
