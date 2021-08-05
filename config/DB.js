const mongoose = require("mongoose");
const dbName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

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

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
