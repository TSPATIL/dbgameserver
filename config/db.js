const mongoose = require("mongoose");

const connectToMongoDB = (mongoURI) => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected To Mongodb Successfully"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

module.exports = connectToMongoDB;
