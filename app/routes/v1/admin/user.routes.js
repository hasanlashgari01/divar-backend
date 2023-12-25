const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const isAdmin = require("../../../middlewares/isAdmin");

const controller = require("../../../controllers/v1/admin/user.controller");

router.use(authMiddleware, isAdmin);

router.route("/ban/:id").post(controller.banUser);
router.route("/role/:id").put(controller.changeRole);

module.exports = { userAdminRouter: router };
