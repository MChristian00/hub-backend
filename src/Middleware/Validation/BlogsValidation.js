import { object, string } from "joi";
class Validate {
  static async blogAddValidate(req, res, next) {
    const schema = object().keys({
      id: string().required(),
      BlogAuthor: string().min(3).required(),
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

export default Validate;
