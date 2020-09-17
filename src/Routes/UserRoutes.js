const express = require("express");
const UsersControllers = require("../Controllers/UsersControllers");
const UserValidate = require("../Middleware/Validation/UserValidation");
const passport = require("passport");
// const tokengen = require('../Helpers/TokenGen')

const router = express.Router();

router.post("/signup", UsersControllers.addUser);

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    // failureMessage: "Login failed",
  }),
  UsersControllers.signUser
);

router.get("/logout",UsersControllers.logout);

module.exports = router;
