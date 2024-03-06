const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json());

require("dotenv").config();

const cors = require("cors");
// app.use(cors());
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

global.publicPath = __dirname + "/public";

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

require("./routes/index")(app);

const http = require("http");
const server = http.Server(app);
const port = process.env.PORT || 3000; // Corrected variable name
server.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});

module.exports = app;
