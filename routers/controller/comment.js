const commentsModel = require("../../db/models/comment"); 


const createComments = (req, res) => {
   
      const { id } = req.params; 
      const { comment } = req.body;

      const newComment = new commentsModel({
        comment,
        user: req.token.id,
        post : id, 
      });
   
      newComment
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
  };
//Done
  const getComments = (req, res) => {
    if (!req.token.deleted) {
      const { id } = req.params; 
   
      commentsModel
        .find({ post: id, deleted: false })
        .populate("user")
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res
              .status(404)
              .json({ message: `there is no comment with the ID: ${id}` });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      res.status(404).json({ message: "your user is deleted .. " });
    }
  };
//Done
const updateComments = (req, res) => {
 
      const { id } = req.params; // comment id 
      console.log(id,"rawan id post on comment");
      const { comment } = req.body;
  
      commentsModel
        .findOneAndUpdate(
          { _id: id, user: req.token.id, deleted: false }, // filters
          { comment: comment },
          { new: true }
        )
        .then((result) => {
          console.log(comment,"rawan comment post on comment");
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: `there is no task with ID: ${id}` });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
          console.log(err);
        });
  };
// Done 
const deleteComments = (req, res) => {

      const { id } = req.params; // comment id ..
    
      commentsModel
        .findOneAndUpdate(
          { _id: id, user: req.token.id, deleted: false },
          { deleted: true },
          { new: true }
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: `there is no task with ID: ${id}` });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
  };  
//// Admin 

const deleteCommentByAdmin = (req,res) => {
  const { id } = req.params;
  // console.log(id);
  commentsModel
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        console.log("id ...........");
        res
          .status(200)
          .json({ message: " the user hsa been deleted successfully .." });
      } else {
        console.log("id ...9999999999........");
        res.status(404).json({ message: `there is no user with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  createComments, 
  getComments, 
  updateComments,
  deleteComments, 
  deleteCommentByAdmin,  
};
