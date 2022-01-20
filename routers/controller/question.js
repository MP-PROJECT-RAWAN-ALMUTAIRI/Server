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
  const { id } = req.params; /// Question ID ...
  console.log(id, "rawan id");
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
//Done
const updQuestion = (req, res) => {
  const { id } = req.params; // question id
  console.log("id ...Rawan..",id);
  const { question } = req.body;
  console.log("question .....",question);

  questionModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, // filters
      { question: question },
      { new: true }
    )
    .then((result) => {
      if (result) {
        console.log("result .....",result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no task with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
const delQuestion = (req, res) => {
  const { id } = req.params; /// Question id
  console.log(id , "id ...........");
  questionModel
  .findByIdAndUpdate(id, { user: req.token.id , deleted: true })
  .then((result) => {
    if (result) {
      console.log("id ......questionModel.....");
      res
        .status(200)
        .json({ message: " the Question hsa been deleted successfully .." });
    } else {
      console.log("id ...else........");
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
   console.log(id);
   questionModel 
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        console.log("id .....rawan......");
        res
          .status(200)
          .json({ message: " the Question hsa been deleted successfully .." });
      } else {
        console.log("id ...9999999999........");
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
