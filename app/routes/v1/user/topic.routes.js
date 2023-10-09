const router = require("express").Router();

const controller = require("../../../controllers/v1/user/topic.controller");

router.route("/").get(controller.getAll);
router.route("/:id").get(controller.getOne);

module.exports = { topicRouter: router };
