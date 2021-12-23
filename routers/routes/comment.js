const express = require("express");
const { createComments, getComments , updateComments , deleteComments ,deleteCommentByAdmin,getAllCommentByAdmin} = require("./../controller/comment"); 
const authentication = require("../Middleware/Authentication");
const authorization = require("./../Middleware/authorization"); 

const commentsRouter = express.Router(); 

commentsRouter.post("/comment/:id", authentication, createComments);
commentsRouter.get("/comment/:id", authentication, getComments);
commentsRouter.put("/comment/:id", authentication, updateComments);  
commentsRouter.delete("/comment/:id", authentication, deleteComments);

/// BY ADMIN ....
commentsRouter.delete("/deleteCommentByAdmin/:id", authentication, authorization, deleteCommentByAdmin);
commentsRouter.get("/getCommentByAdmin", authentication, authorization, getAllCommentByAdmin);

module.exports = commentsRouter; 