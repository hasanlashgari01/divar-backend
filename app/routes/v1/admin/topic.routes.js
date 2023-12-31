const router = require("express").Router();
const isAdminMiddleware = require("../../../middlewares/isAdmin");
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/admin/topic.controller");

router.use(authMiddleware, isAdminMiddleware);
router.route("/:id").delete(controller.remove).patch(controller.update);
router.route("/").post(controller.create);

module.exports = { topicAdminRouter: router };
