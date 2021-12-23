const commentsModel = require("../../db/models/comment"); 
const postModel = require("../../db/models/post"); 
const roleModel = require("./../../db/models/role");

//Done
const createComments = (req, res) => {
   
      const { id } = req.params; // post id 
      const { comment } = req.body;
     console.log(comment,id);
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
      const { id } = req.params; // comment      id user: req.token.id,
   
      commentsModel
        .find({ post: id, deleted: false })
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res
              .status(404)
              .json({ message: `there is no todo with the ID: ${id}` });
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
      const { comment } = req.body;
  
      commentsModel
        .findOneAndUpdate(
          { _id: id, user: req.token.id, deleted: false }, // filters
          { comment: comment },
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
const getAllCommentByAdmin = (req,res) => {
  commentsModel
  .find({}) 
  .then((result) => {
    if (result.length !== 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "there is no users found !" });
    }
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

const deleteCommentByAdmin = (req,res) => {
  const { id } = req.params; // id for comment 

  commentsModel
    .findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no post with ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}; 

module.exports = {
  createComments, 
  getComments, 
  updateComments,
  deleteComments, 
  getAllCommentByAdmin,
  deleteCommentByAdmin,  
};
