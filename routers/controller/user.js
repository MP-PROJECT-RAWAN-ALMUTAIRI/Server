const usersModel = require("./../../db/models/user");
const postModel = require("./../../db/models/post");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
dotenv.config();

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRET_KEY;

// Email transport
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS ,
  },
});


const signup = async (req, res) => {
  const { email, userName, password, avatar, role } = req.body;
  
  if (
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password) &&
    password.length > 6
  ) {
    // const savedEmail = email.toLowerCase();
    // const savedName = userName.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseUsername = userName.toLowerCase();

    const userExists = await usersModel.findOne({
      $or: [{ userName: lowerCaseUsername }, { email: lowerCaseEmail }],
    });
  
    if (!userExists) {
      const hashedPassword = await bcrypt.hash(password, SALT);
      let activeCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      activeCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

 // <------------------------------------------------------------------->
    //const savedPassword = await bcrypt.hash(password, SALT);
    //rand = Math.floor(Math.random() * 100 + 54);
  // const lowerCaseEmail = email.toLowerCase();
  // const hashedPassword = await bcrypt.hash(password, SALT);
  // <------------------------------------------------------------------->
  const newUser = new usersModel({
      email: lowerCaseEmail,
      userName: lowerCaseUsername,
      password: hashedPassword,
      passwordCode: "",
      activeCode,
      avatar,
      role,
  });
  // console.log(newUser);
  newUser
  .save()
  .then((result) => {
    transport
      .sendMail({
        from: process.env.EMAIL,
        to: lowerCaseEmail,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${lowerCaseUsername}</h2>
          <h4>CODE: ${activeCode}</h4>
          <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
          </div>`,

      })
      // <a href="http://localhost:3000/verify_account/${result._id}"> Click here</a>
      .catch((err) => console.log(err));
    res.status(201).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
} else {
res.json({
  message: "Email or Username already taken!",
});
}
}
};
//   newUser
//     .save()
//     .then((result) => {
//       // res.status(201).json(result);
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: { user: process.env.USER, pass: process.env.PASS },
//       });
//       const mailOptions = {
//         from: "tuwaiqclub@gmail.com",
//         to: result.email,
//         subject: "Account Verification Link",
//         text:
//           "Hello " +
//           result.username +
//           ",\n\n" +
//           "Please verify your account by clicking the link: \n http://" +
//           req.headers.host +
//           "/confirmation/" +
//           result.email +
//           "/" +
//           rand +
//           "\n\nThank You!\n",
//       };
//       transporter.sendMail(mailOptions, function (err) {
//         if (err) {
//           res.status(500).send({
//             msg: "Technical Issue!, Please click on resend for verify your Email.",
//           });
//         }
//         res
//           .status(200)
//           .send(
//             "A verification email has been sent to " +
//               result.email +
//               ". It will be expire after one day. If you not get verification Email click on resend link."
//           );
//       });

//       // res.status(201).json(result);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// } else {
//   res.status(400).json({ msg: "your password not complex" });
// }
// };

const verifyAccount = async (req, res) => {
  const { id, code } = req.body;

  const user = await usersModel.findOne({ _id: id });

  if (user.activeCode == code) {
    usersModel
      .findByIdAndUpdate(id, { active: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await usersModel.findOne({ email });

  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    usersModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.USER,
            to: result.email,
            subject: "Reset Your Password",
            html: `<h1>Reset Your Password</h1>
              <h2>Hello ${result.userName}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              </div>`,
          })
          // <a href="........................./reset_password/${result._id}"> Click here</a>
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;

  const user = await usersModel.findOne({ _id: id });

  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    usersModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  //console.log(lowerCaseEmail, password);
  usersModel
    .findOne({ email: lowerCaseEmail })
    .populate("role") /// Find
    .then(async (result) => {
      if (result) {
        //console.log(result);
        if (result.deleted === false) {
          if (result.email == lowerCaseEmail) {
            //console.log(result.email);
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );
            //console.log(typeof matchedPassword);
            if (matchedPassword == true) {
              //console.log(matchedPassword);
              const payload = {
                id: result._id,
                email: result.email,
                userName: result.userName,
                role: result.role.role,
                deleted: result.deleted,
              };
              console.log(result);

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
    .find({deleted: false})
    //---------------------------------------------------//
    // يجيب حساب المستخدم مع البروفايل والصور و محتواها
    //  .populate("post")
    //  .populate("followers")
    //  .populate("following")
    //---------------------------------------------------//
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
        const post = await postModel.find({ user: id, post:id , deleted: false });
        if (post.length > 0) {
          res.status(200).json({ result, post });
        } else {
          // console.log("commnet commnet commnet commnet......");
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

const changeBio = (req, res) => {
  const { id } = req.params; // user id
  const { Bio } = req.body;
  usersModel
    .findOneAndUpdate(
      { _id: id }, /// filtres
      { Bio: Bio },
      { new: true }
    )
    // .populate("like")
    // .populate("followers")
    // .populate("following")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const followUser = (req, res) => {
  try {
    usersModel.findByIdAndUpdate(
      req.body.userId,
      {
        $push: { following: req.body.otherUserId },
      },
      () => {
        console.log("User has been followed");
      }
    );
    usersModel.findByIdAndUpdate(
      req.body.otherUserId,
      {
        $push: { followers: req.body.userId },
      },
      () => {
        console.log("User has been added to followers");
      }
    );
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.json({ error });
  }
};

const unFollowUser = (req, res) => {
  try {
    usersModel.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { following: req.body.otherUserId },
      },
      () => {
        console.log("User has been unfollowed");
      }
    );
    usersModel.findByIdAndUpdate(
      req.body.otherUserId,
      {
        $pull: { followers: req.body.userId },
      },
      () => {
        console.log("User has been removed from followers");
      }
    );
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.json({ error });
  }
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



module.exports = {
  signup,
  verifyAccount,
  checkEmail,
  resetPassword,
  login,
  getUsers,
  getUser,
  followUser,
  unFollowUser,
  changeBio,
  deleteUser,
};
