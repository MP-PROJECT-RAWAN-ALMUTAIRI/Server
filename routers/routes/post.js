const express = require("express");
const {
  createPost,
  getOnePost,
  getAllPost,
  delPost,
  updatePost, 
  newLike,
  deletePostsByAdmin,
  getAllPostByAdmin,
} = require("./../controller/post");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization");

const postRouter = express.Router(); 

postRouter.post("/post", authentication, createPost);
postRouter.post("/Likeposts/:id", authentication, newLike);
postRouter.get("/post/:id", authentication, getOnePost);
postRouter.get("/post", getAllPost);
postRouter.put("/post/:id", authentication, updatePost);
postRouter.delete("/post/:id", authentication, delPost);

/// BY ADMIN ....
postRouter.delete(
  "/deletePostByAdmin/:id",
  authentication,
  authorization,
  deletePostsByAdmin
);
postRouter.get(
  "/getPostByAdmin",
  authentication,
  authorization,
  getAllPostByAdmin
);

module.exports = postRouter;
