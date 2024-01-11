const router = require("express").Router();
const isAuthMiddleware = require("../../../middlewares/isAuth");

const controller = require("../../../controllers/v1/user/user.controller");

router.use(isAuthMiddleware);
router.route("/me/settings").get(controller.getDetails).put(controller.updateDetails);
router.route("/profile/:username").get(controller.viewProfile);

module.exports = { userRouter: router };
