const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://ecommerce-website-mern.netlify.app";
const corsOptions = {
  origin: url,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};

const socketCors = {
  cors: true,
  origins: [url],
};

module.exports = { corsOptions, socketCors };
