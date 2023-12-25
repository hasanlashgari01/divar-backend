const { TopicModel } = require("../../../models/topic");

exports.getAll = async (req, res, next) => {
    try {
        const topics = await TopicModel.find({}, { __v: 0, updatedAt: 0 }).lean();

        res.json(topics);
    } catch (error) {}
};
