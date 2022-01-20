const express = require("express");
const { newQuestion , getOneQuestion, getAllQuestions ,updQuestion ,delQuestion ,deleteQuestionByAdmin} = require("./../controller/question");  
const authentication = require("../Middleware/Authentication");
const authorization = require("./../Middleware/authorization"); 
 
const questionRouter = express.Router(); 
 
questionRouter.post("/questions", authentication, newQuestion); 
questionRouter.get("/one/:id", authentication,getOneQuestion); 
questionRouter.get("/discussion", authentication, getAllQuestions);
questionRouter.put("/updQuestion/:id", authentication, updQuestion);
questionRouter.delete("/questions/:id", authentication, delQuestion);

/// BY ADMIN ....

questionRouter.delete("/deleteQuestionByAdmin/:id", authentication, authorization, deleteQuestionByAdmin);


module.exports = questionRouter; 