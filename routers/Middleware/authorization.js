const roleModel = require("./../../db/models/role");

const authorization =async (req, res, next) => {
  try {

     const relatedId = req.token.role;
   
    if (relatedId === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authorization; 