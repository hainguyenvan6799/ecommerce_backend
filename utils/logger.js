const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};

// The logger has two functions, info for printing normal log messages, and error for all error messages.
