const mongoose = require("mongoose");
const config = require("../utils/config");
const dbName = config.MONGODB_USERNAME;
const dbPassword = config.MONGODB_PASSWORD;

// Connect to mongodb database
// Account login mongodb: account google hainguyenvan6799.webdev@gmail.com
// DB name: mernstack
// DB username: hainguyenvan6799
// DB password: Thu0379343794

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbName}:${dbPassword}@mern-project.lvxab.mongodb.net/mernstack?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});

module.exports = connectDB;
