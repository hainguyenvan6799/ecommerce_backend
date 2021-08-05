require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const routeIndex = require("./routes");
const { corsOptions } = require("./utils/cors");
const { connectSocketIO } = require("./services/socketIO");
const { ChatEvent } = require("./events/ChatEvent");

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const chatEvent = new ChatEvent("chat");
const server = connectSocketIO(app, chatEvent);

routeIndex(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

module.exports = app;
