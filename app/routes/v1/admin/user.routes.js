const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const isAdmin = require("../../../middlewares/isAdmin");

const controller = require("../../../controllers/v1/admin/user.controller");

router.route("/:id/ban").post(authMiddleware, isAdmin, controller.banUser);
router.route("/:id/role").put(authMiddleware, isAdmin, controller.changeRole);

module.exports = { userAdminRouter: router };
