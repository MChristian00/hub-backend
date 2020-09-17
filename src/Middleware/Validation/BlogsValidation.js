const Joi = require("joi");

class Validate {
  static async blogAddValidate(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number(),
      BlogAuthor: Joi.string().min(3).required("Name Required"),
    });
    await schema.validate(req.body, (err) => {
      console.log("before returning");
      if (err) {
        return res.status(400).send(err.details);
      } else {
        console.log("before next");
        next();
      }
    });
  }
}

module.exports = Validate;
