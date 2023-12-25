const { CommentModel } = require("../../../models/comment");

exports.getAcceptedComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({ isAccepted: 1 }, { __v: 0, updatedAt: 0 }).lean();

        return res.json(comments);
    } catch (error) {
        next(error);
    }
};

exports.getNotAcceptedComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({ isAccepted: 0 }, { __v: 0, updatedAt: 0 }).lean();

        return res.json(comments);
    } catch (error) {
        next(error);
    }
};
