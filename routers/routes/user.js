const express = require("express");
const { signup, login, getUsers, deleteUser } = require("./../controller/user");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization"); 

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);

// Admin ... 
userRouter.get("/user",authentication, authorization, getUsers);
userRouter.delete("/user/:id",authentication, authorization, deleteUser);

module.exports = userRouter; 