const disscationModel = require("../../db/models/discussion");
const questionModel = require("../../db/models/question"); 


const createDiscussion = (req, res) => {
    const { id } = req.params; // id for question
    const { reply } = req.body;
  
    const newdiss = new disscationModel({
        reply,
        user: req.token.id,
        question : id, 
    });
  
    newdiss
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  // <-------------get dissction only without question--------------------->
const getOneDis = (req, res) => {
    const { id } = req.params; /// question ID ...
    disscationModel 
      .find({ question: id  ,deleted: false })
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
};

module.exports = {
    createDiscussion,
    getOneDis, 
}