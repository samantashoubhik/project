const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database Connacted ..");
  } catch (err) {
    console.log(e.message);
    // Exit process with failure
    process.exit(1);
  }
};
