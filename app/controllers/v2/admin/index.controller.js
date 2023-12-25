const { BanUserModel } = require("../../../models/banUser");
const { PostModel } = require("../../../models/post");
const { TopicModel } = require("../../../models/topic");
const { UserModel } = require("../../../models/user");

exports.getDetails = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, { password: 0, __v: 0, updatedAt: 0 }).sort({ createdAt: -1 }).lean();
        const topics = await TopicModel.find({}, { __v: 0 }).lean();
        const admins = await UserModel.find({ role: "ADMIN" }).count();
        const posts = await PostModel.find({}).count();
        const usersBanned = await BanUserModel.find({}).count();

        return res.json({
            admins: { count: admins },
            users: { count: users.length, newUsers: users.slice(0, 10) },
            topics: { count: topics.length, newTopics: topics.slice(0, 5) },
            posts: { count: posts },
            usersBanned: { count: usersBanned },
        });
    } catch (error) {
        next(error);
    }
};
