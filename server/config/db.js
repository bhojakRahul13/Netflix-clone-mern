const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = () => {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("mongodb connect successfully.");
      } else {
        console.log("ERROr in db:" + err);
        //process.exit(1);
      }
    }
  );
}; //db name practical-demo

module.exports = db;
