const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");
const { verifiedOtp } = require("../../../middlewares/otp");

const controller = require("../../../controllers/v1/user/auth.controller");

router.post("/access-register", controller.accessRegister);
router.post("/register", verifiedOtp, controller.register);
router.post("/access-login", controller.accessLogin);
router.post("/login", verifiedOtp, controller.login);
router.get("/getMe", authMiddleware, controller.getMe);

module.exports = { authRouter: router };
