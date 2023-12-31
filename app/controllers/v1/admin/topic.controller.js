const { TopicModel } = require("../../../models/topic");
const createTopicValidator = require("../../../validators/topic/create");
const { checkExist } = require("../../../utils/funcs");

exports.create = async (req, res, next) => {
    try {
        const validationResults = createTopicValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        const { name, href } = req.body;

        await TopicModel.create({ name, href: href.toLowerCase() });

        res.status(201).json({ status: "ok", message: `موضوع ${name} با موفقیت ایجاد شد.` });
    } catch (error) {
        next(error);
    }
};
exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const deletedTopic = await TopicModel.deleteOne({ _id: id });
        if (!deletedTopic.deletedCount) next({ status: 404, message: "موضوع مورد نظر یافت نشد" });

        res.json({ message: "موضوع مورد نظر با موفقیت حذف شد." });
    } catch (error) {
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        checkExist(id, next);

        const validationResults = createTopicValidator(req.body);
        if (validationResults !== true) return next({ status: 422, message: validationResults });

        const { name, href } = req.body;
        let link = await href.toLowerCase();

        const topic = await TopicModel.findOne({ href: link });
        if (topic) return next({ status: 404, message: "موضوع مورد نظر وجود ندارد." });

        const updateTopic = await TopicModel.findByIdAndUpdate({ _id: id }, { name, href: link });
        if (!updateTopic) return next({ status: 409, message: "ویرایش به مشکل خورد." });

        res.status(201).json({ status: "ok", message: `موضوع ${name} با موفقیت ویرایش شد.` });
    } catch (error) {
        next(error);
    }
};
