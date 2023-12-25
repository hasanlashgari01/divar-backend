const router = require("express").Router();

const controller = require("../../../controllers/v2/admin/comment.controller");

router.route("/default").get(controller.getNotAcceptedComments);
router.route("/accepted").get(controller.getAcceptedComments);

module.exports = { commentAdminRouter: router };
