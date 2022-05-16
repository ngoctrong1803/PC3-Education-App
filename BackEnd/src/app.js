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
// start socket io
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// //require("events").EventEmitter.prototype._maxListeners = 0;
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // host of client
//     methods: ["GET", "POST"],
//   },
// }); // => from client
// let couter = 0;
// io.on("connection", (socket) => {
//   console.log(` + user connected: ${socket.id}`);

//   io.on("disconnect", () => {
//     console.log(` - user disconnect: ${socket.id}`);
//   });
// });

// server.listen(9000, () => {
//   console.log("SERVER IS RUNNING");
// });
// end socket io

app.listen(8000, () => {
  console.log("Listening at :8000...");
});
