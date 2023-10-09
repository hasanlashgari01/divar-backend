module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";

    if (!isAdmin)
        return next({ status: 403, message: "این مسیر محافظت شده است و شما نمی توانید به آن دسترسی داشته باشید." });

    next();
};
