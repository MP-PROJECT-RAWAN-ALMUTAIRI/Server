const express = require("express");
const {
  signup,
  verifyAccount,
  checkEmail,
  resetPassword,
  login,
  getUsers,
  getUser,
  followUser,
  unFollowUser,
  changeBio,
  deleteUser,
} = require("./../controller/user");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization");

const userRouter = express.Router();

// DONE ..
userRouter.post("/signup", signup); 
userRouter.post("/verify_account", verifyAccount);
userRouter.post("/check_email", checkEmail);
userRouter.post("/reset_password", resetPassword);
userRouter.post("/login", login);
userRouter.get("/user/:id", getUser);
userRouter.put("/updateBio/:id", changeBio);
userRouter.get("/users", authentication, getUsers);
//---------------------------------------------------//

userRouter.put("/followUser", followUser); /// need to test it in front end ... 
userRouter.put("/unFollowUser", unFollowUser); /// need to test it in front end ...  

//---------------------------------------------------//


// Admin ...
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.delete("/user/:id", authentication, authorization, deleteUser);

module.exports = userRouter;
