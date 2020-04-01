var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  homeCoordinates: {
    latitude: Number,
    longitude: Number
  }
});

var User = (module.exports = mongoose.model("user", userSchema));
