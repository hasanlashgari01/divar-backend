const router = require("express").Router();
const isAdminMiddleware = require("../../../middlewares/isAdmin");
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/admin/comment.controller");

router.use(authMiddleware, isAdminMiddleware);
router.route("/").get(controller.getAll);
router.route("/:id").delete(controller.remove);
router.get("/:id/accept", controller.acceptedByAdmin);
router.get("/:id/reject", controller.rejectedByAdmin);

module.exports = { commentAdminRouter: router };
