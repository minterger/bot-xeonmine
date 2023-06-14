const mongoose = require("mongoose");

const uri = process.env.DATABASE;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
})();
