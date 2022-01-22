const express = require("express");
const { createDiscussion, getOneDis ,deleteRep } = require("../controller/discussion"); 
const authentication = require("../Middleware/Authentication");
const authorization = require("../Middleware/authorization");

const disRouter = express.Router();

disRouter.post("/reply/:id", authentication, createDiscussion);
disRouter.get("/reply/:id", authentication, getOneDis);
disRouter.delete("/reply/:id", authentication, deleteRep);

module.exports = disRouter;
