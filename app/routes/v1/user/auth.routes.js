const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/user/auth.controller");

router.post("/register", controller.register);
router.post("/access-login", controller.accessLogin);
router.post("/login", controller.login);
router.get("/getMe", authMiddleware, controller.getMe);

module.exports = { authRouter: router };
