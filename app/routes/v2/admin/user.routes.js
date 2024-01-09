const router = require("express").Router();

const controller = require("../../../controllers/v2/admin/user.controller");

router.route("/").get(controller.getAllUsers);
router.route("/banned").get(controller.getAllBanUsers);

module.exports = { userAdminRouter: router };
