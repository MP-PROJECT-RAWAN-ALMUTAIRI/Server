const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET_KEY; 

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(403).json({ message: "forbidden" });
    console.log(SECRET);
    const token = req.headers.authorization.split(" ")[1];
  
    const parsedToken = jwt.verify(token, SECRET);
    req.token = parsedToken;
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authentication;