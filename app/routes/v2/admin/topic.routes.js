const router = require("express").Router();

const controller = require("../../../controllers/v2/admin/topic.controller");

router.route("/").get(controller.getAll);

module.exports = { topicAdminRouter: router };
