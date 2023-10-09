const { PostModel } = require("../../../models/post");
const { CommentModel } = require("../../../models/comment");
const { checkExist } = require("../../../utils/funcs");
const createPostValidator = require("../../../validators/post/create");

exports.create = async (req, res, next) => {
    try {
        const validationResults = createPostValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        const { title, description, body, cover, status, topicID } = req.body;

        const createPost = await PostModel.create({
            title,
            description,
            body,
            cover,
            status,
            topicID,
            author: req.user._id,
        });

        res.status(201).json({ status: "ok", message: `پست ${title} با موفقیت ایجاد شد.` });
    } catch (error) {
        next(error);
    }
};
exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const deletedTopic = await PostModel.deleteOne({ _id: id });
        if (!deletedTopic.deletedCount) return next({ status: 404, message: "پست مورد نظر یافت نشد" });

        res.json({ message: "پست مورد نظر با موفقیت حذف شد." });
    } catch (error) {
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const validationResults = createPostValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        const { title, description, body, cover, href, status, categoryID } = req.body;

        const isAuthor = await PostModel.findOne({
            _id: id,
            author: req.user._id,
        });
        if (!isAuthor) return next({ message: "فقط نویسنده پست می تواند ویرایش کند." });

        const updatePost = await PostModel.findByIdAndUpdate(
            { _id: id },
            { title, description, body, cover, href, status, categoryID }
        );
        if (!updatePost) return next({ status: 404, message: "ویرایش به مشکل خورد." });

        res.status(201).json({ status: "ok", message: `موضوع ${title} با موفقیت ویرایش شد.` });
    } catch (error) {
        next(error);
    }
};
exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const post = await PostModel.findOne({ _id: id, status: "published" }, "-__v").lean();
        if (!post) return next({ status: 404, message: "پست مورد نظر یافت نشد" });

        const comments = await CommentModel.find({ post: id, isAccepted: 1 })
            .select("-__v")
            .sort({ updatedAt: 1 })
            .populate("author", "name role username");

        res.send({ post, comments });
    } catch (error) {
        next(error);
    }
};
exports.getAllPublished = async (req, res, next) => {
    try {
        const topics = await PostModel.find({ status: "published" }, "-__v").lean();
        if (!topics.length) return next({ status: 404, message: "پستی یافت نشد." });

        res.json(topics);
    } catch (error) {
        next(error);
    }
};
exports.getMaybeLikePosts = async (req, res, next) => {
    try {
        let posts = await PostModel.find({}, "-__v").populate("topicID", "-__v").lean();
        posts = posts.filter(({ topicID }) => topicID.href == "freelance");

        if (!posts.length) return next({ status: 404, message: "پستی پیدا نشد" });

        res.send(posts);
    } catch (error) {
        next(error);
    }
};
