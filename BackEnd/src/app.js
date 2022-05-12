const express = require("express");
const BodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var app = express();
var cors = require("cors");



app.use(BodyParser.json());
//app.use(BodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const route = require("./routes");
// connect db
const db = require("./config/db");
db.connect();

//routes
route(app);

app.listen(8000, () => {
  console.log("Listening at :8000...");
});
