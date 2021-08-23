const yup = require("yup");

const productSchema = yup.object().shape({
  url: yup
    .string()
    .transform((value, original) => {
      return value.trim();
    })
    // .trim("The contact name cannot include leading and trailing spaces")
    .required("url can not be empty"),
  detailUrl: yup.string().required("detail url can not be empty"),
  description: yup.string().required("description can not be empty"),
  discount: yup.string().required("discount can not be empty"),
  tagline: yup.string().required("tag line can not be empty"),
  shortTitle: yup.string().required("short title can not be empty."),
  longTitle: yup.string().required("long title can not be empty."),
  mrp: yup
    .number()
    .positive("mrp can not be nagative")
    .required("mrp can not be empty"),
  cost: yup
    .number()
    .positive("cost can not be nagative")
    .required("cost can not be empty"),
  discount: yup.string().required("discount discribe can not be empty"),
  // title: yup.object().shape({
  //   shortTitle: yup.string().required("short title can not be empty."),
  //   longTitle: yup.string().required("long title can not be empty."),
  // }),
  // price: yup.object().shape({
  //   mrp: yup
  //     .number()
  //     .positive("mrp can not be nagative")
  //     .required("mrp can not be empty"),
  //   cost: yup
  //     .number()
  //     .positive("cost can not be nagative")
  //     .required("cost can not be empty"),
  //   discount: yup.string().required("discount discribe can not be empty"),
  // }),
});

module.exports = productSchema;
