const questionModel = require("./../../db/models/question");
const userModel = require("./../../db/models/user");

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
  questionModel
    .findOne({ _id: id, deleted: false })
    .then(async (result) => {
    res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAllQuestions = (req, res) => {
  questionModel
    .find({})
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
module.exports = {
  newQuestion,
  getOneQuestion,
  getAllQuestions,
};
