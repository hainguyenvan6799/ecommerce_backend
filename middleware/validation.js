const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    const result = await schema.validate(body);
    req.body = result;
    next();
    // return next();
  } catch (error) {
    // return res.status(400).json({ success: false, message: error });
    next(error);
  }
};

module.exports = validation;
