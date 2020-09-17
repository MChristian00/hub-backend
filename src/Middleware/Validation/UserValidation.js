const Joi = require("joi");

class UserValidate {
  static async userAddValidate(req, res, next){
    const schema = Joi.object().keys({
      FirstName: Joi.string().min(2).required(),
      LastName: Joi.string().min(2).required(),
      Email: Joi.string().email().required(),
      Password: Joi.string().min(3).required(),
    });
    await schema.validate(req.body, (err) => {
      if (err) {
        console.log("in if");
        return res.status(400).json(err.details);
      } else {
        next();
        console.log("after next");
      }
    });
  }

  // userUpdateValidate(args) {
  //   const schema = Joi.object().keys({
  //     FirstName: Joi.string().min(2),
  //     LastName: Joi.string().min(2),
  //     Email: Joi.email(),
  //     Password: Joi.min(3),
  //   });
  //   return schema.validate(req.body);
  // }
}

module.exports = UserValidate;
