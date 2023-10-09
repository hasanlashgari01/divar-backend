const router = require("express").Router();
const isAdminMiddleware = require("../../../middlewares/isAdmin");
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/admin/topic.controller");

router.use(authMiddleware, isAdminMiddleware);
router.route("/").post(controller.create);
router.route("/:id").delete(controller.remove).put(controller.update);

module.exports = { topicAdminRouter: router };
