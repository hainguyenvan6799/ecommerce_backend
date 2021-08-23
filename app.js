const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const routeIndex = require("./routes");

const { corsOptions } = require("./utils/cors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

routeIndex(app);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

module.exports = app;
