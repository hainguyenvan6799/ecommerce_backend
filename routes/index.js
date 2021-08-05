// import routers
const authRouter = require("./auth");
const productRouter = require("./product");
const paymentRouter = require("./payment");
const fileRouter = require("./files");

const routeIndex = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/file", fileRouter);
};

module.exports = routeIndex;
