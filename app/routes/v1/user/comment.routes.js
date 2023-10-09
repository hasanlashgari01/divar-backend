const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/user/comment.controller");

router.route("/").post(authMiddleware, controller.create);
router.post("/:id/answer", authMiddleware, controller.answer);

module.exports = { commentRouter: router };
