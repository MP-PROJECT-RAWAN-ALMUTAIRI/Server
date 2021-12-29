const express = require("express");
const { moreReply ,getOneReply } = require("../controller/moreReply"); 
const authentication = require("../Middleware/Authentication");
const authorization = require("../Middleware/authorization");

const replyMoreRouter = express.Router();

replyMoreRouter.post("/replyMore/:id", authentication, moreReply);
replyMoreRouter.get("/replyMore/:id", authentication, getOneReply);

module.exports = replyMoreRouter;