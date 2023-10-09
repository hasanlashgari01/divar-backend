const { PostModel } = require("../../../models/post");
const { TopicModel } = require("../../../models/topic");
const { checkExist } = require("../../../utils/funcs");

exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const topic = await TopicModel.findById({ _id: id }, "-__v").lean();
        if (!topic) return next({ status: 404, message: "موضوع مورد نظر یافت نشد" });

        const posts = await PostModel.find({ topicID: id }).sort({ updatedAt: 1 });

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
