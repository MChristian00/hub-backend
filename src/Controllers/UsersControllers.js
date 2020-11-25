import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Users from "../Database/Models/User";
import Helper from "../Helpers/Helpers";
// const UserValidate = require("../Middleware/Validation/UserValidation");

module.exports = {
  addUser: async (req, res) => {
    const {
      FirstName, LastName, Email, Password
    } = req.body;
    // const { error } = UserValidate.useraddValidate(req.body);
    // if (error) res.status(400).send(error.details[0].message);
    try {
      const hash = bcrypt.hashSync(Password, 10);
      const newUser = new Users({
        _id: new mongoose.Types.ObjectId(),
        FirstName,
        LastName,
        Email,
        Password: hash,
      });

      await Users.create(newUser, (err, user) => {
        if (err) {
          Helper.setError(500, err);
        } else {
          Helper.setSuccess(201, "User added", user);
        }
        return Helper.send(res);
      });
    } catch (error) {
      Helper.setError(404, error);
    }
  },

  signUser: async (req, res) => {
    req.session.userId = req.user._id;
    Helper.setSuccess(200, "User signed", req.user);
    Helper.send(res);
    // const { Email, Password } = req.body;
    // // const { error } = UserValidate.useraddValidate(req.body);
    // // if (error) res.status(400).send(error.details[0].message);
    // try {
    //   await Users.findOne(
    //     {
    //       Email: Email,
    //       Password: Password,
    //     },
    //     (err, user) => {
    //       if (err) return Helper.setError(500, err);
    // Helper.setSuccess(200, "User signed", user);
    //     }
    //   ).select("_id FirstName LastName Email createdAt");
    // } catch (error) {
    //   Helper.setError(404, error);
    // }
    // Helper.send(res);
  },
  logout: async (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          Helper.setError(401, err);
        }
      });
    }
    console.log("logout", req.cookies);
    req.logout();
    Helper.setSuccess(200, "User logged out", null);
    Helper.send(res);
  },
};
