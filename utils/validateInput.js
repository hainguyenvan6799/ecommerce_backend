const validateInputs = (input, regex) => {
  return regex.test(input);
};

module.exports = validateInputs;
