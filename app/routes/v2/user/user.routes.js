const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v2/user/user.controller");

router.route("/follow/:id").get(controller.getFollowers).post(authMiddleware, controller.following);
router.route("/yourFollowers/:id").get(controller.getYourFollowers);
router.route("/unfollow/:id").delete(authMiddleware, controller.unfollow);

module.exports = { usersRouter: router };
