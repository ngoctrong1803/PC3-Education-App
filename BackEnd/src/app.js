 const express = require("express");
const BodyParser = require("body-parser");
var app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json())

const route = require('./routes')
// connect db
const db = require("./config/db");
db.connect();

//routes
route(app);




// Define REST API
// app.post("/person", async (request, response) => {});
// app.get("/people", async (request, response) => {});
// app.get("/person/:id", async (request, response) => {});
// app.put("/person/:id", async (request, response) => {});
// app.delete("/person/:id", async (request, response) => {});

app.listen(8000, () => {
    console.log("Listening at :8000...");
});