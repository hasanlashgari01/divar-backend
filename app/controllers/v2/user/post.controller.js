const { isValidObjectId } = require("mongoose");
const { PostLikesModel } = require("../../../models/postLike");
const { PostBookmarksModel } = require("../../../models/postBookmark");

exports.likePost = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه پست معتبر نیست." });

    const isExistPost = await PostLikesModel.findOne({ post: id });
    if (!isExistPost) {
        const postLikeCreate = await PostLikesModel.create({ post: id, likeList: [req.user._id] });
    } else {
        const postLikeUpdate = await PostLikesModel.updateOne({ post: id, $push: { likeList: req.user._id } });
    }

    res.status(201).json({ message: "پست با موفقیت لایک شد." });
};

exports.unLikePost = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه پست معتبر نیست." });

    const postLikeUpdate = await PostLikesModel.updateOne({ post: id, $pull: { likeList: req.user._id } });

    res.status(201).json({ message: "پست با موفقیت آن لایک شد." });
};

exports.bookmarkPost = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه پست معتبر نیست." });

    const isExistBookmark = await PostBookmarksModel.findOne({ post: id });
    if (!isExistBookmark) {
        const postBookmarkCreate = await PostBookmarksModel.create({ post: id, bookmarkList: [req.user._id] });
    } else {
        const postBookmarkUpdate = await PostBookmarksModel.updateOne({ post: id, $push: { bookmarkList: req.user._id } });
    }

    res.status(201).json({ message: "پست با موفقیت نشان شد." });
};

exports.unBookmarkPost = async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next({ status: 401, message: "شناسه پست معتبر نیست." });

    const postBookmarkUpdate = await PostBookmarksModel.updateOne({ post: id, $pull: { bookmarkList: req.user._id } });

    res.status(201).json({ message: "پست با موفقیت آن نشان شد." });
};
