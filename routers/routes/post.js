const express = require("express");
const {
  createPost,
  getOnePost,
  getAllPost,
  delPost,
  updatePost,
  deletePostsByAdmin,
  getAllPostByAdmin,
} = require("./../controller/post");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization");

const postRouter = express.Router();

postRouter.post("/post", authentication, createPost);
postRouter.get("/post/:id", authentication, getOnePost);
postRouter.get("/post", authentication, getAllPost);
postRouter.delete("/post/:id", authentication, delPost);
postRouter.put("/post/:id", authentication, updatePost);

/// BY ADMIN ....
postRouter.delete("/deletePostByAdmin/:id", authentication, authorization, deletePostsByAdmin);
postRouter.get("/getPostByAdmin", authentication, authorization, getAllPostByAdmin);

module.exports = postRouter;