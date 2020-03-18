var mongoose = require("mongoose");

var tripSchema = mongoose.Schema({
  trip: {
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
  }
});

var Trip = (module.exports = mongoose.model("trip", tripSchema));
module.exports.get = function(callback, limit) {
  Trip.find(callback).limit(limit);
};
