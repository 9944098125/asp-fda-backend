const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized ! No Token Provided" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};

const verifyRestaurantOwner = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(404)
      .json({ message: "Unauthorized ! No Token Provided" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    if (decoded.isRestaurantOwner) {
      req.user = decoded;
      next();
    } else {
      return res.status(404).json({ message: "Not Authorized" });
    }
  });
};

module.exports = { verifyToken, verifyRestaurantOwner };
