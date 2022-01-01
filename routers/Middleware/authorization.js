const roleModel = require("./../../db/models/role");

const authorization =async (req, res, next) => {
  try {

    console.log("rawan authorization  ..................try..........");
     const relatedId = req.token.role;
    //  const result = await roleModel.findById(relatedId);
  //  console.log(result.role);
    if (relatedId === "Admin") {
      console.log("rawan authorization  ...................Admin role.........");
      next();
    } else {
      // console.log("token");
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authorization; 