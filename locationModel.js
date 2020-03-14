var mongoose = require("mongoose");

var locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Location = (module.exports = mongoose.model("location", locationSchema));
module.exports.get = function(callback, limit) {
  Location.find(callback).limit(limit);
};
