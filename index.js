require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const foodItemsRoute = require("./routes/foodItems");
const restaurantsRoute = require("./routes/restaurants");
const cartRoute = require("./routes/cart");
const connectDatabase = require("./dbConnection/db");

const app = express();
// declaring the app as an express instance
app.use(express.json());
// parsing the express data to json format

app.use("/uploads", express.static("uploads"));
// server config for image uploads
app.use(cors());
// implementing browser middleware to allow this backend
// to be integrated with backend
app.use(bodyParser.json());
// parsing the data from frontend request body to json format
app.use(bodyParser.urlencoded({ extended: true }));
// allowing backend to accept nested objects in the request body from frontend

// use the api endpoints here
app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/foodItems", foodItemsRoute);
app.use("/api/cart", cartRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong !";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  connectDatabase();
  console.log(`App is now running on port [${port}]`);
});
