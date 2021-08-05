const http = require("http");
const Server = require("socket.io");
const { socketCors } = require("../utils/cors");

const connectSocketIO = (app, event) => {
  //   const server = http.createServer(app);

  //   const io = Server(server, socketCors);

  //   io.on("connection", (socket) => {
  //     console.log("A user connected socketIO");

  //     socket.on("chat", (msg) => {
  //       io.emit("chat", msg);
  //     });
  //   });
  const server = createServerForIO(http, app);

  const io = IOSocket(Server, server, socketCors);

  onConnectionIO(io, event);

  return server;
};

const createServerForIO = (methodCreate, app) => {
  const server = methodCreate.createServer(app);
  return server;
};

const IOSocket = (IOSocket, initialSocket, socketCors) => {
  const io = IOSocket(initialSocket, socketCors);
  return io;
};

const onConnectionIO = (io, event) => {
  io.on("connection", (socket) => {
    console.log("A user connected socketIO");

    socket.on(event.name, (args) => event.doCallback(io, args));

    socket.on("disconnect", () => {
      console.log("User had left!!!");
    });
  });
};

module.exports = { connectSocketIO };
