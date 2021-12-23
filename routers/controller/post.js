const postModel = require("../../db/models/post");
const commentModel = require("../../db/models/comment");
const likeModel = require("../../db/models/like");

const createPost = (req, res) => {
  const { description, pic, file, video } = req.body;

  const newPost = new postModel({
    description,
    pic,
    file,
    video,
    user: req.token.id,
  });

  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getOnePost = (req, res) => {
  const { id } = req.params; /// POST ID ...
  postModel
    .findOne({ _id: id, user: req.token.id, deleted: false })
    .then(async (result) => {
      if (result) {
        const commnet = await commentModel.find({ post: id, deleted: false });
        const like = await likeModel.find({ post: id, deleted: false });
        //  console.log(commnet);
        if (commnet.length > 0) {
          res.status(200).json({ result, commnet, like });
        } else {
          // console.log("commnet commnet commnet commnet......");
          res.status(200).json({ result, like });
        }
      } else {
        res.status(404).json({ message: `post is deleted ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAllPost = (req, res) => {
  postModel
    .find({ user: req.token.id, deleted: false })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "there no post ..." });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const delPost = (req, res) => {
  const { id } = req.params; /// Post id 
 
  postModel
    .findOneAndUpdate(
      { _id: id, deleted: false },
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

const updatePost = (req, res) => {
  const { id } = req.params;
  const { description, pic, file, video } = req.body;
  postModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, /// filtres
      { description: description, pic: pic, file: file, video: video },
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

//// BY ADMIN ....
const deletePostsByAdmin = (req, res) => {
  const { id } = req.params;

  postModel
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

const getAllPostByAdmin = (req, res) => {
  postModel
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

module.exports = {
  createPost,
  getOnePost,
  getAllPost,
  delPost,
  updatePost,
  deletePostsByAdmin,
  getAllPostByAdmin,
};
