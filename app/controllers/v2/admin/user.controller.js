const { UserModel } = require("../../../models/user");

exports.getAllUsers = async (req, res, next) => {
    try {
        const { sort: sortTitle } = req.query;
        const users = await UserModel.find({}, { password: 0, __v: 0, updatedAt: 0 })
            .sort({ [sortTitle]: 1 })
            .lean();
        const filteredUsers = users.filter(obj => obj.username !== req.user.username);

        return res.json({
            count: filteredUsers.length,
            users: filteredUsers,
        });
    } catch (error) {
        next(error);
    }
};
