import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { compare } from "bcryptjs";
import User from "../Database/Models/User";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

export default (passport) => {
  passport.use(
    new LocalStrategy(async (Email, Password, done) => {
      await User.findOne({ Email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "No User found" });
        compare(Password, user.Password, (err, isValid) => {
          if (err) return done(err);
          if (isValid) return done(null, user);
          return done(null, false, { message: "Incorrect password" });
        });
      }).select("_id FirstName LastName  Password Email createdAt");
    })
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/login/google/redirect",
      },
      (refreshToken, accessToken, profile, cb) => {
        console.log("GoogleProfile", profile);
        cb(null, profile);
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/auth/login/facebook/redirect",
        profileFields: ["id", "email", "displayName"],
      },
      (refreshToken, accessToken, profile, cb) => {
        console.log("FacebookProfile", profile);
        cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, cb) => {
    console.log("serial", user);
    // cb(null, user._id);
    cb(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("deserial", user);
    done(null, user);
    // User.findOne({ _id: id }, (err, user) => {
    //   done(err, user);
    // });
  });
};
