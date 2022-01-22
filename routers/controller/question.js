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
  const { id } = req.params;
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
const updQuestion = (req, res) => {
  const { id } = req.params; 
  const { question } = req.body;

  questionModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false }, 
      { question: question },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no question with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
const delQuestion = (req, res) => {
  const { id } = req.params; 
  questionModel
  .findByIdAndUpdate(id, { user: req.token.id , deleted: true })
  .then((result) => {
    if (result) {
      res
        .status(200)
        .json({ message: " the Question hsa been deleted successfully .." });
    } else {
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
   questionModel 
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: " the Question hsa been deleted successfully .." });
      } else {
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
