const { CommentModel } = require("../../../models/comment");
const { PostModel } = require("../../../models/post");
const createCommentValidator = require("../../../validators/comment/create");

exports.create = async (req, res, next) => {
    try {
        const validationResults = createCommentValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        const { body, post } = req.body;

        const postStatus = await PostModel.findById({ _id: post });
        if (postStatus.status === "draft") return next({ status: 402, message: "پست مورد نظر منتشر نشده است." });

        const createComment = await CommentModel.create({ post, body, author: req.user._id });

        res.status(201).json({ status: "ok", message: `کامنت با موفقیت ایجاد شد.` });
    } catch (error) {
        next(error);
    }
};
exports.answer = async (req, res, next) => {
    try {
        const { body } = req.body;

        const acceptedComment = await CommentModel.findOneAndUpdate(
            { _id: req.params.id },
            { isAccepted: 1, isAnswer: 1 }
        );
        if (!acceptedComment) return next({ status: 404, message: "کامنت مورد نظر یافت نشد." });

        const answerComment = await commentModel.create({
            post: acceptedComment.post,
            body,
            author: req.user._id,
            isAnswer: 0,
            isAccepted: 1,
            mainCommentID: req.params.id,
        });

        res.status(201).json(answerComment);
    } catch (error) {
        next(error);
    }
};
