const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LINK);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failure:", error.message);
    process.exit(1);
  }
};

module.exports = connectdb;