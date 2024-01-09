const { BanUserModel } = require("../../../models/banUser");
const { UserModel } = require("../../../models/user");

exports.getAllUsers = async (req, res, next) => {
    try {
        const { sort: sortTitle } = req.query;
        const users = await UserModel.find({ role: "USER" }, { password: 0, __v: 0, updatedAt: 0 })
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

exports.getAllBanUsers = async (req, res, next) => {
    try {
        const { sort: sortTitle } = req.query;
        const users = await BanUserModel.find({}, { password: 0, __v: 0, updatedAt: 0 })
            .sort({ [sortTitle]: 1 })
            .lean();
        const filteredUsers = users.filter(obj => obj.username !== req.user.username);

        return res.json({ users: filteredUsers });
    } catch (error) {
        next(error);
    }
};

exports.getAllAdmins = async (req, res, next) => {
    try {
        const { sort: sortTitle } = req.query;
        const users = await UserModel.find({ role: "ADMIN" }, { password: 0, __v: 0, updatedAt: 0 })
            .sort({ [sortTitle]: 1 })
            .lean();
        const filteredAdmins = users.filter(obj => obj.username !== req.user.username);

        return res.json({ admins: filteredAdmins });
    } catch (error) {
        next(error);
    }
};
