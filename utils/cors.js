const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};

const socketCors = {
  cors: true,
  origins: ["http://localhost:3000"],
};

module.exports = { corsOptions, socketCors };
