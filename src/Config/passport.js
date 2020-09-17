const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../Database/Models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (Email, Password, done) => {
      await User.findOne({ Email: Email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "No User found" });
        bcrypt.compare(Password, user.Password, (err, isValid) => {
          if (err) return done(err);
          if (isValid) return done(null, user);
          return done(null, false, { message: "Incorrect password" });
        });
      }).select("_id FirstName LastName  Password Email createdAt");
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
