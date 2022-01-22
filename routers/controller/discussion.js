const disscationModel = require("../../db/models/discussion");
const questionModel = require("../../db/models/question"); 


const createDiscussion = (req, res) => {
    const { id } = req.params; 
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
<<<<<<< HEAD
 
=======
  // <-------------get dissction only without question--------------------->
>>>>>>> 437f3d648fef61406b9be29cfd306ba1e9bb6062
const getOneDis = (req, res) => {
    const { id } = req.params; /// question ID ...
    disscationModel 
      .find({ question: id  ,deleted: false })
      .populate("user")
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res
            .status(404)
            .json({ message: `there is no question with the ID: ${id}` });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};

const deleteRep = (req, res) => {

  const { id } = req.params; 

  disscationModel
    .findOneAndUpdate(
      { _id: id, user: req.token.id, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `there is no Replay with ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};  

module.exports = {
    createDiscussion,
    getOneDis, 
    deleteRep,
}