const express = require("express");
const bodyParser = require("body-parser");

const { indexRouter: indexRouterV1 } = require("./app/routes/v1/index.routes");
const { indexRouter: indexRouterV2 } = require("./app/routes/v2/index.routes");
const { notFoundError, errorHandler } = require("./app/middlewares/errorHandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(indexRouterV1);
app.use(indexRouterV2);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
