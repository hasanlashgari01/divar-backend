const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth");

const controller = require("../../../controllers/v1/user/post.controller");

router.route("/").get(controller.getAllPublished).post(authMiddleware, controller.create);
router.get("/maybeLikedPosts", controller.getMaybeLikePosts);
router
    .route("/:id")
    .get(controller.getOne)
    .put(authMiddleware, controller.update)
    .delete(authMiddleware, controller.remove);

module.exports = { postRouter: router };
