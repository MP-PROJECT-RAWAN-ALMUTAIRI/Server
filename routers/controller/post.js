const postModel = require("../../db/models/post");
const commentModel = require("../../db/models/comment");
const likeModel = require("../../db/models/like");
const userModel = require("../../db/models/user"); 

const createPost = (req, res) => {
      const { description, pic, title ,GitHubLink} = req.body;

  const newPost = new postModel({
    description,
    pic,
    title,
    GitHubLink,
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
  console.log(id);
  console.log(".......id post......................");
  postModel
    .findOne({ _id: id , deleted: false})
     .populate("user")
    .then(async (result) => {
      console.log(result);
      if (result) {
        const commnet = await commentModel.find({ post: id, deleted: false });
        const like = await likeModel.find({ post: id, deleted: false });
        //  console.log(commnet);
        if (commnet.length > 0) {
          res.status(200).json({ result, commnet, like });
        } else {
          // console.log("commnet commnet commnet commnet......");
          res.status(200).json({ result, like, commnet });
        }
      } else {
        res.status(404).json({ message: `post is deleted ${id}` });
      }
    })
    .catch((err) => { 
      console.log("result /..................................");
      res.status(400).json(err);
    });
};

const getAllPost = (req, res) => {
  postModel
    .find({deleted: false})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const delPost = (req, res) => {
  const { id } = req.params; /// Post id
  console.log(id , "id ...........");
  postModel
  .findByIdAndUpdate(id, { user: req.token.id , deleted: true })
  .then((result) => {
    if (result) {
      console.log("id ......post post.....");
      res
        .status(200)
        .json({ message: " the post hsa been deleted successfully .." });
    } else {
      console.log("id ...else........");
      res.status(404).json({ message: `there is no post with ID: ${id}` });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { description, pic ,GitHubLink} = req.body;
  postModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, /// filtres
      { description: description, pic: pic , GitHubLink: GitHubLink },
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

const newLike = async (req, res) => {
  const { id } = req.params; // post id
  console.log(id);
  try {
    const like = await likeModel.findOne({
      post: id,
      user: req.token.id,
    });
    console.log(like);
    if (like) {
      //// ({ _id: like._id })
      likeModel.findOneAndDelete({ post: id }).then((result) => {
        res.status(200).json("unliked successfuly");
      });
    } else {
      const newLike = new likeModel({
        post: id,
        user: req.token.id,
      });

      newLike
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//// BY ADMIN ....
const deletePostsByAdmin = (req, res) => {
  const { id } = req.params;
   console.log(id);
  postModel 
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        console.log("id .....rawan......");
        res
          .status(200)
          .json({ message: " the Post hsa been deleted successfully .." });
      } else {
        console.log("id ...9999999999........");
        res.status(404).json({ message: `there is no Post with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};


module.exports = {
  createPost,
  getOnePost,
  getAllPost,
  delPost,
  updatePost,
  newLike,
  deletePostsByAdmin,
};