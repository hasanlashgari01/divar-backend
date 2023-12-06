const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { indexRouter: indexRouterV1 } = require("./app/routes/v1/index.routes");
const { indexRouter: indexRouterV2 } = require("./app/routes/v2/index.routes");
const { notFoundError, errorHandler } = require("./app/middlewares/errorHandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(indexRouterV1);
app.use(indexRouterV2);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
