// import routers
const authRouter = require("./auth");
const productRouter = require("./product");
const paymentRouter = require("./payment");
const fileRouter = require("./files");
const chatRoomRouter = require("./chatroom");
const chatMessageRouter = require("./chatMessage");
const testRouter = require("./note");

const routeIndex = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/files", fileRouter);
  app.use("/api/chatroom", chatRoomRouter);
  app.use("/api/chatmessage", chatMessageRouter);
  app.use("/api/notes", testRouter);
};

module.exports = routeIndex;
