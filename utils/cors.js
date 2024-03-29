const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://master--test-ecommerce-mern.netlify.app";
const corsOptions = {
  origin: url,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
};

const socketCors = {
  cors: true,
  origins: [url],
};

module.exports = { corsOptions, socketCors };
