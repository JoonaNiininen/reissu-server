require("dotenv").config({
  path:
    "C:\\Users\\Joona\\Documents\\JS\\reissuvahti\\reissu-server\\server\\constants.env"
});

let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let apiRoutes = require("./api-routes");
let express = require("express");
let app = express();
let port = process.env.PORT;
let dburl = process.env.DBURL;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

mongoose.connect(dburl, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;

app.get("/", (req, res) => res.send("Connection OK"));

app.listen(port, function() {
  console.log("Server listening on port " + port);
});

app.use("/api", apiRoutes);
