// --------------db init file
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// ----------------connecting db----------------
const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
      }
    );
    console.log("DB Connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// ----------------connecting db----------------

module.exports = connectDB;
