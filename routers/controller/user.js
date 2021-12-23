const usersModel = require("./../../db/models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { email, userName, password, avatar, role } = req.body;
  // console.log(email, userName, password, avatar, role);

  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);
  // console.log(lowerCaseEmail , hashedPassword); 
  const newUser = new usersModel({
    email: lowerCaseEmail,
    userName, 
    password: hashedPassword,
    avatar, 
    role,
  });
  // console.log(newUser); 
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  usersModel
    .findOne({ email: lowerCaseEmail })
    .populate("role") /// Find 
    .then(async (result) => {
      if (result) {
        if (result.deleted === false) {
          if (result.email == lowerCaseEmail) {
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );

            if (matchedPassword) {
              const payload = {
                id: result._id,
                email: result.email,
                userName: result.userName, 
                role: result.role.role,
                deleted: result.deleted,
              };

              const options = {
                expiresIn: "60h",
              };

              const token = jwt.sign(payload, SECRET, options);

              res.status(200).json({ result, token });
            } else {
              res.status(400).json({ message: "invalid e-mail or password !" });
            }
          } else {
            res.status(400).json({ message: "invalid e-mail or password !" });
          }
        } else {
          res.status(404).json({ message: "the user is deleted !" });
        }
      } else {
        res.status(404).json({ message: "e-mail does not exist !" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
    usersModel
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

const deleteUser = (req, res) => {
 
    const { id } = req.params;
// console.log(id);
    usersModel
      .findByIdAndUpdate(id, { deleted: true })
      .then((result) => {
        if (result) {
          console.log("id ...........");
          res
            .status(200)
            .json({ message: " the user hsa been deleted successfully .." });
        } else {
          console.log("id ...9999999999........");
          res.status(404).json({ message: `there is no user with ID: ${id}` });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
};

module.exports = { signup, login, getUsers, deleteUser };