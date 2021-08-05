const yup = require("yup");

const loginSchema = yup.object().shape({
  username: yup.string().required("username can not be empty"),
  password: yup.string().required("password can not be empty"),
});

module.exports = loginSchema;
