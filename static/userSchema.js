var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  homeCoordinates: {
    latitude: Number,
    longitude: Number
  }
});

var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};