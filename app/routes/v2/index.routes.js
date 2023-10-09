const router = require("express").Router();

const { postsRouter } = require("./user/post.routes");
const { usersRouter } = require("./user/user.routes");

router.use("/v2/user", usersRouter);
router.use("/v2/post", postsRouter);

module.exports = { indexRouter: router };
