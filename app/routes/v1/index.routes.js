const router = require("express").Router();
// users
const { authRouter } = require("./user/auth.routes");
const { userRouter } = require("./user/user.routes");
const { topicRouter } = require("./user/topic.routes");
const { postRouter } = require("./user/post.routes");
const { commentRouter } = require("./user/comment.routes");
// admins
const { userAdminRouter } = require("./admin/user.routes");
const { topicAdminRouter } = require("./admin/topic.routes");
const { postAdminRouter } = require("./admin/post.routes");
const { commentAdminRouter } = require("./admin/comment.routes");

// users
router.use("/v1/auth", authRouter);
router.use("/v1/user", userRouter);
router.use("/v1/topic", topicRouter);
router.use("/v1/post", postRouter);
router.use("/v1/comment", commentRouter);
// admins
router.use("/v1/admin/user", userAdminRouter);
router.use("/v1/admin/topic", topicAdminRouter);
router.use("/v1/admin/post", postAdminRouter);
router.use("/v1/admin/comment", commentAdminRouter);

module.exports = { indexRouter: router };
