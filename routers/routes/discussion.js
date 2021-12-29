const express = require("express");
const { createDiscussion, getOneDis } = require("../controller/discussion"); 
const authentication = require("../Middleware/Authentication");
const authorization = require("../Middleware/authorization");

const disRouter = express.Router();

disRouter.post("/reply/:id", authentication, createDiscussion);
// disRouter.post("/replyMore/:id", authentication, moreReply);
disRouter.get("/reply/:id", authentication, getOneDis);

module.exports = disRouter;
