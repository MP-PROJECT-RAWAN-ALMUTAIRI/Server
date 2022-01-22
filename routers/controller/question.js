const questionModel = require("./../../db/models/question");

const newQuestion = (req, res) => {
  const { question } = req.body;

  const newdQuestion = new questionModel({
    user: req.token.id,
    question,
  });

  newdQuestion
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getOneQuestion = (req, res) => {
<<<<<<< HEAD
  const { id } = req.params;
=======
  const { id } = req.params; /// Question ID ...
  console.log(id, "rawan id");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
  questionModel
    .findOne({ _id: id, deleted: false })
    .populate("user")
    .then(async (result) => {
    res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getAllQuestions = (req, res) => {
  questionModel
  .find({deleted: false})
    .populate("user")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
<<<<<<< HEAD
const updQuestion = (req, res) => {
  const { id } = req.params; 
  const { question } = req.body;

  questionModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, 
=======
//Done
const updQuestion = (req, res) => {
  const { id } = req.params; // question id
  console.log("id ...Rawan..",id);
  const { question } = req.body;
  console.log("question .....",question);

  questionModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, // filters
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
      { question: question },
      { new: true }
    )
    .then((result) => {
      if (result) {
<<<<<<< HEAD
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no question with ID: ${id}` });
=======
        console.log("result .....",result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no task with ID: ${id}` });
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
const delQuestion = (req, res) => {
<<<<<<< HEAD
  const { id } = req.params; 
=======
  const { id } = req.params; /// Question id
  console.log(id , "id ...........");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
  questionModel
  .findByIdAndUpdate(id, { user: req.token.id , deleted: true })
  .then((result) => {
    if (result) {
<<<<<<< HEAD
=======
      console.log("id ......questionModel.....");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
      res
        .status(200)
        .json({ message: " the Question hsa been deleted successfully .." });
    } else {
<<<<<<< HEAD
=======
      console.log("id ...else........");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
      res.status(404).json({ message: `there is no Question with ID: ${id}` });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
};
// Admin
const deleteQuestionByAdmin =  (req, res) => {
  const { id } = req.params;
<<<<<<< HEAD
=======
   console.log(id);
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
   questionModel 
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
<<<<<<< HEAD
=======
        console.log("id .....rawan......");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
        res
          .status(200)
          .json({ message: " the Question hsa been deleted successfully .." });
      } else {
<<<<<<< HEAD
=======
        console.log("id ...9999999999........");
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
        res.status(404).json({ message: `there is no Question with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
module.exports = {
  newQuestion,
  getOneQuestion,
  getAllQuestions,
  updQuestion,
  delQuestion,
  deleteQuestionByAdmin,
};
