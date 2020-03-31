var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  homeCoordinates: {
    type: String,
    required: true
  }
});

var User = (module.exports = mongoose.model("user", userSchema));
