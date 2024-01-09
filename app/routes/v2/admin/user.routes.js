const router = require("express").Router();

const controller = require("../../../controllers/v2/admin/user.controller");

router.route("/").get(controller.getAllUsers);

module.exports = { userAdminRouter: router };
