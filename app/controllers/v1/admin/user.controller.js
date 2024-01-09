const { UserModel } = require("../../../models/user");
const { BanUserModel } = require("../../../models/banUser");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const mainUser = await UserModel.findOne({ _id: id });
        const isBanned = await BanUserModel.findOne({ phone: mainUser.phone });
        if (isBanned) return next({ status: 409, message: "کاربر بن شده است." });

        const banUserResult = await BanUserModel.create({ phone: mainUser.phone });
        if (!banUserResult) res.json({ message: "دوباره تلاش کنید." });

        const removeUser = await UserModel.findByIdAndDelete({ _id: id });

        res.json({ message: "کاربر با موفقیت بن شد.." });
    } catch (error) {
        next(error);
    }
};

exports.changeRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return next({ status: 409, message: "شناسه مورد نظر یافت نشد" });

        const user = await UserModel.findOne({ _id: id });

        let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, { role: newRole });
        if (!updatedUser) return next({ status: 404, message: "کاربر یافت نشد." });

        res.json({ message: `نقش ${user.name} به ${newRole === "USER" ? "کاربر" : "مدیر"} تغییر کرد.` });
    } catch (error) {
        next(error);
    }
};
