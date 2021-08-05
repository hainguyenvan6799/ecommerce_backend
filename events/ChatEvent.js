class ChatEvent {
  constructor(name) {
    this.name = name;
  }

  doCallback(io, args) {
    io.emit(this.name, args);
  }
}

module.exports = { ChatEvent };
