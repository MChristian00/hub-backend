const Joi = require("joi");

class Validate {
  static async blogAddValidate(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      BlogAuthor: Joi.string().min(3).required(),
    });
    schema.validate(req.body, (err) => {
      console.log("before returning");
      if (err) {
        return res.status(400).send(err.details);
      } else {
        next();
      }
    });
  }
}

module.exports = Validate;
