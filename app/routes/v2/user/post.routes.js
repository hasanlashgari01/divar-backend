const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v2/user/post.controller");

router.route("/:id/like").post(authMiddleware, controller.likePost);
router.route("/:id/unlike").delete(authMiddleware, controller.unLikePost);
router.route("/:id/bookmark").post(authMiddleware, controller.bookmarkPost);
router.route("/:id/unbookmark").delete(authMiddleware, controller.unBookmarkPost);

module.exports = { postsRouter: router };
