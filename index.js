require("dotenv").config();

let express = require("express");
let app = express();
var port = process.env.PORT;

app.get("/", (req, res) => res.send("Testing"));

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
