const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const isAdminMiddleware = require("../../../middlewares/isAdmin");

const controller = require("../../../controllers/v1/admin/post.controller");

router.use(authMiddleware, isAdminMiddleware);
router.route("/").get(controller.getAll);
router.route("/publish/:id").put(controller.publishedByAdmin);
router.route("/draft/:id").put(controller.draftedByAdmin);

module.exports = { postAdminRouter: router };
