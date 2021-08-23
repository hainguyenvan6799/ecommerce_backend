class WebSockets {
  constructor() {
    if (WebSockets.instance == null) {
      this.users = [];
      this.connection = this.connection.bind(this);
      WebSockets.instance = this;
    }
  }

  connection(client) {
    // event fired when the chat room is disconnected
    // client.on("disconnect", () => {
    //   this.users = this.users.filter((user) => user.socketId !== client.id);
    // });
    // add identity of user mapped to the socket id
    client.on("identity", (userId) => {
      const userInfo = {
        socketId: client.id,
        userId: userId,
      };
      const value = this.users.find(
        (user) => user.socketId === client.id && user.userId === userId
      );

      if (!value) {
        this.users.push(userInfo);
      }
    });
    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otherUserId = "") => {
      client.join(room);
      if (otherUserId) {
        this.subscribeOtherUser(room, otherUserId);
      }
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  }

  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );

    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.sockets.get(userInfo.socketId);

      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

// apply singleton to create instance
const socket = new WebSockets();
Object.freeze(socket);

module.exports = socket;
