const express = require("express");
const { addRate, getRates } = require("./../controller/ratting");
const authentication = require("./../Middleware/Authentication");
// const authorization = require("./../Middleware/authorization");

const rateRouter = express.Router();

// new rate
rateRouter.post("/rate/:id", authentication, addRate);
// get rate
rateRouter.get("/rates/:id", getRates);

module.exports = rateRouter;