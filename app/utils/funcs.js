const { isValidObjectId } = require("mongoose");

exports.checkExist = (identifier, next) => {
    if (!isValidObjectId(identifier)) return next({ status: 404, message: "شناسه مورد نظر یافت نشد." });
};

// ! // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE1MzY4YjZjODI4ZTdhNDNkYjFjYyIsImlhdCI6MTY5NjY4MzA2NiwiZXhwIjoxNjk5Mjc1MDY2fQ.3cwDjlELVRS29V_kLTPu4WVj8qs4B2Qce8DIEZZczxk
// * // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE1NDczNDBhYTU4ZGUxZGE1ZDc0YSIsImlhdCI6MTY5NjY4MzEyMywiZXhwIjoxNjk5Mjc1MTIzfQ.m_joOL-zbDefPLwDhp2KCHvo3yK-gmifYXUtGmEurWA
// ? saeedi rad // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE3MzM2OGI2NmM3YWQxZDVjZTViZSIsImlhdCI6MTY5NjY5MDk5OCwiZXhwIjoxNjk5MjgyOTk4fQ.YDpKhNlYujGyYlah6A1x2BHxCO-grE1GbGurd7WV5KQ
