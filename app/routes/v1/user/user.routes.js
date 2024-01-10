const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const isAuthMiddleware = require("../../../middlewares/isAuth");

const controller = require("../../../controllers/v1/user/user.controller");

router.route("/me/settings").get(isAuthMiddleware, controller.getDetails).put(authMiddleware, controller.updateDetails);

router.put("/me/username");
router.put("/me/name", controller.updateName);
router.put("/me/email");
// router.put("/me/password");
router.put("/me/phone");
// router.put("/me/avatar");
router.put("/me/biography");
router.put("/me/gender");
router.put("/me/telegram");
router.put("/me/twitter");
router.put("/me/linkedin");

router.route("/profile/:username").get(isAuthMiddleware, controller.viewProfile);

module.exports = { userRouter: router };
