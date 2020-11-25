const express = require("express");
const UsersControllers = require("../Controllers/UsersControllers");
const UserValidate = require("../Middleware/Validation/UserValidation");
const passport = require("passport");
const tokengen = require("../Helpers/Helpers");
const Helpers = require("../Helpers/Helpers");

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
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/login/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
    // session: false,
  }),
  (req, res, next) => {
    console.log("req", req.user);
    Helpers.setSuccess(200, "Google authentication successfull", req.user);
    res.redirect("/go");
  }
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/login/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    // session: false,
  }),
  (req, res, next) => {
    console.log("req", req.user);
    Helpers.setSuccess(200, "Facebook authentication successfull", req.user);
    res.redirect("/fb");
  }
);

router.get("/logout", UsersControllers.logout);

module.exports = router;
