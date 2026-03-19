const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return res.status(400).json({ success: false, errors });
    }
    req.validatedData = result.data;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;