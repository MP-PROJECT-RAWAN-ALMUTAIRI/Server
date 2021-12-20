const usersModel = require("./../../db/models/user");

const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new usersModel({
    email: lowerCaseEmail,
    password: hashedPassword,
    role,
  });

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
  const { userRegister, password } = req.body;

  const userRegisterTo = userRegister.toLowerCase();

  usersModel
    .findOne({ $or: [{ userName: userRegister }, { email: userRegister }] })
    .populate("role")
    .then(async (result) => {
      console.log(result);
      if (result) {
        if (result.deleted === false) {
          // console.log(result.userName == userRegisterTo);
          // console.log(result.email == userRegisterTo);
          if (
            result.userName == userRegisterTo ||
            result.email == userRegisterTo
          ) {
            console.log("result");
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );

            if (matchedPassword) {
              const payload = {
                id: result._id,
                email: result.email,
                role: result.role.role,
                userName: result.userName,
                deleted: result.deleted,
              };

              const options = {
                expiresIn: "4h",
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

module.exports = {
  signup,
  login,
};
