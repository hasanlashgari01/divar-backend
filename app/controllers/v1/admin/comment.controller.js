const { CommentModel } = require("../../../models/comment");
const { PostModel } = require("../../../models/post");
const { checkExist } = require("../../../utils/funcs");

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const deletedComment = await CommentModel.deleteOne({ _id: id });
        if (!deletedComment.deletedCount) return next({ status: 404, message: "کامنت مورد نظر یافت نشد" });

        res.json({ message: "کامنت مورد نظر با موفقیت حذف شد." });
    } catch (error) {
        next(error);
    }
};
exports.getAll = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({}, "-__v")
            .populate("post", "title")
            .populate("author", "username name")
            .sort({ createdAt: -1 })
            .lean();

        if (!comments.length) return next({ status: 404, message: "کامنتی یافت نشد." });

        res.json(comments);
    } catch (error) {
        next(error);
    }
};
exports.acceptedByAdmin = async (req, res, next) => {
    try {
        const acceptedComment = await CommentModel.findOneAndUpdate({ _id: req.params.id }, { isAccepted: 1 });

        if (!acceptedComment) return next({ status: 404, message: "کامنت مورد نظر یافت نشد." });

        return res.json({ message: "کامنت با موفقیت پذیرفته شد." });
    } catch (error) {
        next(error);
    }
};
exports.rejectedByAdmin = async (req, res, next) => {
    try {
        const rejectedComment = await CommentModel.findOneAndUpdate({ _id: req.params.id }, { isAccepted: 0 });

        if (!rejectedComment) return next({ status: 404, message: "کامنت مورد نظر یافت نشد." });

        return res.json({ message: "کامنت با موفقیت رد شد." });
    } catch (error) {
        next(error);
    }
};
