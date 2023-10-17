const jwt = require("jsonwebtoken");
const Restaurants = require("../models/Restaurants");

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
    // console.log(decoded);
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

const verifyParticularRestaurantOwner = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(404)
      .json({ message: "Unauthorized ! No Token Provided" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    const { restaurantId } = req.params;
    const restaurant = await Restaurants.findById({ _id: restaurantId }).exec();
    if (!restaurant) {
      return res.status(403).json({ message: "Restaurant Not Found..." });
    }
    // console.log(restaurant.owner);
    // console.log(decoded);
    if (restaurant.owner.equals(decoded.userId)) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not the owner of this restaurant..." });
    }
  });
};

module.exports = {
  verifyToken,
  verifyRestaurantOwner,
  verifyParticularRestaurantOwner,
};
