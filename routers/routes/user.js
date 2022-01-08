const express = require("express");
const {
  signup,
  verifyAccount,
  login,
  getUsers,
  getUser,
  changeBio,
  deleteUser,
} = require("./../controller/user");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization");

const userRouter = express.Router();

// DONE ..
userRouter.post("/signup", signup); 
userRouter.put("/verify_account/:id", verifyAccount);
userRouter.post("/login", login);
userRouter.get("/user/:id", getUser);
userRouter.put("/update/:id", changeBio);
userRouter.get("/users", authentication, getUsers);
//---------------------------------------------------//

// Admin ...
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.delete("/user/:id", authentication, authorization, deleteUser);

module.exports = userRouter;
