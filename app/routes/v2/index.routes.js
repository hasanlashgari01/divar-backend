const router = require("express").Router();
const isAdminMiddleware = require("../../middlewares/isAdmin");
const authMiddleware = require("../../middlewares/auth");
// users
const { usersRouter } = require("./user/user.routes");
const { postsRouter } = require("./user/post.routes");
// admins
const { indexAdminRouter } = require("./admin/index.routes");
const { userAdminRouter } = require("./admin/user.routes");
const { topicAdminRouter } = require("./admin/topic.routes");
const { commentAdminRouter } = require("./admin/comment.routes");

// users
router.use("/v2/user", usersRouter);
router.use("/v2/post", postsRouter);
// admins
router.use(authMiddleware, isAdminMiddleware);
router.use("/v2/admin/index", indexAdminRouter);
router.use("/v2/admin/user", userAdminRouter);
router.use("/v2/admin/topics", topicAdminRouter);
router.use("/v2/admin/comments", commentAdminRouter);

module.exports = { indexRouter: router };
