const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const isAuthMiddleware = require("../../../middlewares/isAuth");

const controller = require("../../../controllers/v1/user/user.controller");

router.route("/me/settings").get(isAuthMiddleware, controller.getDetails).put(authMiddleware, controller.updateDetails);
router.route("/profile/:username").get(isAuthMiddleware, controller.viewProfile);

module.exports = { userRouter: router };
