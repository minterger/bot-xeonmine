const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.URL_DB}/${process.env.NAME_DB}?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
})();
