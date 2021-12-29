const express = require("express");
const { newQuestion , getOneQuestion, getAllQuestions} = require("./../controller/question");  
const authentication = require("../Middleware/Authentication");
const authorization = require("./../Middleware/authorization"); 
 
const questionRouter = express.Router(); 

 
questionRouter.post("/questions", authentication, newQuestion); 
questionRouter.get("/one/:id", authentication,getOneQuestion); 
questionRouter.get("/discussion", authentication, getAllQuestions);

/// BY ADMIN ....

// commentsRouter.delete("/deleteCommentByAdmin/:id", authentication, authorization, deleteCommentByAdmin);
// commentsRouter.get("/getCommentByAdmin", authentication, authorization, getAllCommentByAdmin);

module.exports = questionRouter; 