const router = require("express").Router();
const isAdminMiddleware = require("../../../middlewares/isAdmin");
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/admin/comment.controller");

router.use(authMiddleware, isAdminMiddleware);
router.route("/").get(controller.getAll);
router.route("/:id").post(controller.remove);
router.put("/:id/accept", controller.acceptedByAdmin);
router.put("/:id/reject", controller.rejectedByAdmin);

module.exports = { commentAdminRouter: router };
