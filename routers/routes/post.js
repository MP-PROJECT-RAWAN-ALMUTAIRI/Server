const express = require("express");
const {
  createPost,
  getOnePost,
  getAllPost,
  delPost,
  updatePost, 
  newLike,
  deletePostsByAdmin,
} = require("./../controller/post");
const authentication = require("./../Middleware/Authentication");
const authorization = require("./../Middleware/authorization");

const postRouter = express.Router(); 

postRouter.post("/post", authentication, createPost);
postRouter.post("/Likeposts/:id", authentication, newLike);
postRouter.get("/post/:id", authentication, getOnePost);
<<<<<<< HEAD
postRouter.get("/post",authentication, getAllPost);
=======
postRouter.get("/post", getAllPost);
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
postRouter.put("/post/:id", authentication, updatePost);
postRouter.delete("/post/:id", authentication, delPost);

/// BY ADMIN ....
postRouter.delete(
  "/deletePostByAdmin/:id",
  authentication,
  authorization,
  deletePostsByAdmin
);

module.exports = postRouter;
