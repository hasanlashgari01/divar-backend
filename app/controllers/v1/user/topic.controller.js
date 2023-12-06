const { PostModel } = require("../../../models/post");
const { TopicModel } = require("../../../models/topic");

exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        let topicID = null;

        const topic = await TopicModel.findOne({ href: id }, "-__v").lean();
        if (!topic) return next({ status: 404, message: "موضوع مورد نظر یافت نشد" });
        topicID = topic._id;

        console.log(topicID);

        const posts = await PostModel.find({ topicID }).sort({ updatedAt: 1 }).populate("author");
        if (posts.length < 0) return next({ status: 404, message: "پستی وجود ندارد" });
        console.log(posts);

        res.json({ topic, posts });
    } catch (error) {
        next(error);
    }
};
exports.getAll = async (req, res, next) => {
    try {
        const topics = await TopicModel.find({}, "-__v").lean();

        if (!topics.length) return next({ status: 404, message: "موضوعی یافت نشد." });

        res.json(topics);
    } catch (error) {
        next(error);
    }
};
