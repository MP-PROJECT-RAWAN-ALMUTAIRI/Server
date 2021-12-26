const usersModel = require("./../../db/models/user");
const ratingModel = require("./../../db/models/ratting");
const postModel = require("./../../db/models/post");

//create new rate
const addRate = (req, res) => {
  try {
    // const id = req.token.id, // user id
    const { id } = req.params; // post
    const { ratting } = req.body; //ratting

    usersModel
      .findOne({ id: id })
      .then((user) => {
        if (user) {
          postModel
            .findOne({ id })
            .then((result) => {
              if (result) {
                ratingModel
                  .findOne({
                    post : id, 
                    user: req.token.id,
                  })
                  .then((result) => {
                    if (result) {
                      res.status(400).json("you already rated");
                    } else {
                      const newRate = new ratingModel({
                        ratting,
                        post : id, 
                        user: req.token.id,
                      });
                      newRate.save();
                      res.status(201).json(newRate);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(400).json(error);
                  });
              } else {
                res.status(404).json("not found event");
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json(error);
            });
        } else {
          res.status(404).json("not found user");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  } catch (error) {
    console.log(error);
  }
};
// get rates of post
const getRates = (req, res) => {
  const { _id } = req.params; //post
  rateModel
    .find({ post: _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { addRate, getRates };
