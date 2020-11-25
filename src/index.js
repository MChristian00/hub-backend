const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const BlogRoutes = require("./Routes/BlogRoutes");
const UserRoutes = require("./Routes/UserRoutes");
require("./Config/passport")(passport);
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/wikis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connection to MONGODB established...");
});

db.on("error", (err) => {
  console.log(err);
});

app.use(
  session({
    secret: "mYsECretKEy",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // secure: true,
      expires: 10000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 10000,
    }),
  })
);

// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, content-type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/Public")));
app.set("views", path.join(__dirname + "/Views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", UserRoutes);
app.use("/api/blogs", BlogRoutes);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

module.exports = app;
