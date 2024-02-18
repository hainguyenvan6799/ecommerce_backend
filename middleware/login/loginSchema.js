const yup = require("yup");

const loginSchema = yup.object().shape({
  username: yup.string().required("Missing username/password"),
  password: yup.string().required("Missing username/password"),
});

module.exports = loginSchema;
