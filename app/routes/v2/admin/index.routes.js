const router = require("express").Router();

const controller = require("../../../controllers/v2/admin/index.controller");

router.route("").get(controller.getDetails);

module.exports = { indexAdminRouter: router };
