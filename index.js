require("dotenv").config();
const app = require("./app");
// const express = require("express");
// const cors = require("cors");
// const logger = require("morgan");
const connectDB = require("./config/DB");
// const routeIndex = require("./routes");
const { corsOptions, socketCors } = require("./utils/cors");
// const { connectSocketIO } = require("./services/socketIO");
// const { ChatEvent } = require("./events/ChatEvent");
const socket = require("./services/test");
const http = require("http");
const socketio = require("socket.io");

// utils
const logger = require("./utils/logger");
const config = require("./utils/config");

connectDB();

// const app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(cors(corsOptions));

// const chatEvent = new ChatEvent("chat");
// const server = connectSocketIO(app, chatEvent);

const server = http.createServer(app);

// routeIndex(app);

/** catch 404 and forward to error handler */
// app.use("*", (req, res) => {
//   return res.status(404).json({
//     success: false,
//     message: "API endpoint doesnt exist",
//   });
// });

server.listen(config.PORT, () => {
  logger.info(`server running at http://localhost:${config.PORT}/`);
});

global.io = socketio(server, socketCors);
global.io.on("connection", socket.connection);

// module.exports = app;
