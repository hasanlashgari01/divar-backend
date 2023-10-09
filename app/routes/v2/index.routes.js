const router = require("express").Router();

const { usersRouter } = require("./user/user.routes");

router.use("/v2/user", usersRouter);

module.exports = { indexRouter: router };
