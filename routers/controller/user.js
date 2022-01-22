const usersModel = require("./../../db/models/user");
const postModel = require("./../../db/models/post");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
dotenv.config();

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRET_KEY;

const EMAIL = process.env.EMAIL;  
const PASS = process.env.PASS;  

//DONE
const signup = async (req, res) => {
  const { email, userName, password ,role ,Bio , GitHubLink} = req.body;

  const savedEmail = email.toLowerCase();
    // ============ | RETURN ERROR IF EMAIL IS INVALID |
    if (!RegExp(/^\w+([\.-]?\w+)*@(\yahoo.com)+$/).test(savedEmail))
    res.status(400).json({ message:"Invalid Email, Your Email Must Be Tuwaiq Email"});
  //
  const savedPassword = await bcrypt.hash(password, SALT);
  try {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });
    let codee = "";
    const num = "0123456789";
    for (let i = 0; i < 4; i++) {
      codee += num.charAt(Math.floor(Math.random() * num.length));
    }
    const newUser = new usersModel({
      userName,
      email: savedEmail,
      password: savedPassword,
      role,
      Bio , 
      GitHubLink,
      codee,
    });

    newUser
      .save()
      .then((result) => {
        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.userName}`,
          text: `This is a message to confirm your identity please write this code: ${codee} to confirm your email. `,
        };
        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            res.json(result);
          }
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
// DONE
const verifyAccount = async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;
  usersModel.findOne({ _id: id }).then((ele) => {
    if (ele.codee == code) {
      usersModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: { active: true } },
          { new: true }
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(400).json("Wrong Code");
          }
        });
    } else {
      res.status(400).json("Wrong Code");
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  usersModel
    .findOne({ email: lowerCaseEmail })
    .populate("role") /// Find
    .then(async (result) => {
      if (result){
       
        if (result.deleted === false) {
          if (result.email == lowerCaseEmail) {
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );
            if (matchedPassword == true) 
            {
              const payload = {
                id: result._id,
                email: result.email,
                userName: result.userName,
                role: result.role.role,
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
      console.log(err);
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  usersModel
    .find({ deleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUser = (req, res) => {
  const { id } = req.params; // id for user.

  usersModel
    .findOne({ _id: id })
    .then(async (result) => {
      if (result) {
        const post = await postModel.find({
          user: id,
          post: id,
          deleted: false,
        });
        if (post.length > 0) {
          res.status(200).json({ result, post });
        } else {
          res.status(200).json({ result, post });
        }
      } else {
        res.status(404).json({ message: `post is deleted ` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const upBio = (req, res) => {
  const { id } = req.params; // user id
  const { avatar } = req.body;
  usersModel
    .findByIdAndUpdate(
      { _id: id , deleted: false}, /// filtres
      { avatar: avatar },
      { new: true }
    ) 
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

 const updateGitHubLink = (req,res) => {
  const { id } = req.params; // user id
  const { GitHubLink } = req.body;
  usersModel
    .findOneAndUpdate(
      { _id: id , user: req.token.id, deleted: false }, /// filtres
      { GitHubLink: GitHubLink },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
 
const updateBio = (req,res) => {
  const { id } = req.params; // user id
  const { Bio } = req.body;
  usersModel
    .findOneAndUpdate(
      { _id: id , user: req.token.id, deleted: false}, /// filtres
      { Bio: Bio },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  usersModel
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: " the user hsa been deleted successfully .." });
      } else {
        res.status(404).json({ message: `there is no user with ID: ${id}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  signup,
  verifyAccount,
  login,
  getUsers,
  getUser,
  upBio,
  updateBio,
  updateGitHubLink,
  deleteUser,
};
