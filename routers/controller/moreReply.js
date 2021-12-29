const moreRplyModel = require("../../db/models/replyMore");
const disscationModel = require("../../db/models/discussion");


const moreReply = (req, res) => {
  const { id } = req.params; // id for reply ...
  const { moreReply } = req.body;

  const newMore = new moreRplyModel({
    moreReply,
    reply: id,
    user: req.token.id,
  });
  newMore
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getOneReply = (req, res) => {
    const { id } = req.params; /// reply ID ...
    moreRplyModel 
      .find({ reply: id  ,deleted: false })
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
  moreReply,
  getOneReply,
};
