import { join } from "path";
import express, { json } from "express";
import { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import { connect, connection } from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import BlogRoutes from "./Routes/BlogRoutes";
import UserRoutes from "./Routes/UserRoutes";

dotenv.config();

const MongoStore = require("connect-mongo")(session);

require("./Config/passport").default(passport);

const app = express();
const PORT = process.env.PORT || 8080;

connect("mongodb://localhost/wikis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = connection;

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
      mongooseConnection: connection,
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
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", UserRoutes);
app.use("/api/blogs", BlogRoutes);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

export default app;
