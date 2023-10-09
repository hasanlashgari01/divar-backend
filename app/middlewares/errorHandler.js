exports.notFoundError = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "صفحه یافت نشد.",
    });
};

exports.errorHandler = (err, req, res, next) => {
    const status = err.status ?? err.statusCode ?? 500;
    const success = err.success ?? false;
    const message = err?.message ?? "خطایی از سمت سرور داخلی رخ داده است.";

    res.status(status).json({
        status: status,
        success,
        message,
    });
};
