const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully Connected to MongoDB !");
  } catch (err) {
    throw err;
  }
}

mongoose.connection.on("connected", () => {
  console.log("Connecting to database...");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnecting...");
});

module.exports = connectDatabase;
