const { PostModel } = require("../../../models/post");

exports.getAll = async (req, res, next) => {
    try {
        const topics = await PostModel.find({}, "-__v").lean();

        if (!topics.length) return next({ status: 404, message: "پستی یافت نشد." });

        res.json(topics);
    } catch (error) {
        next(error);
    }
};
exports.publishedByAdmin = async (req, res, next) => {
    try {
        const publishedPost = await PostModel.findOneAndUpdate({ _id: req.params.id }, { status: "published" });
        if (!publishedPost) return next({ status: 404, message: "پست مورد نظر یافت نشد." });

        return res.json({ message: "پست با موفقیت پذیرفته شد." });
    } catch (error) {
        next(error);
    }
};
exports.draftedByAdmin = async (req, res, next) => {
    try {
        const draftedPost = await PostModel.findOneAndUpdate({ _id: req.params.id }, { status: "draft" });
        if (!draftedPost) return next({ status: 404, message: "پست مورد نظر یافت نشد." });

        return res.json({ message: "پست با موفقیت پیش نویس شد." });
    } catch (error) {
        next(error);
    }
};
