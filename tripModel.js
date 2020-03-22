var mongoose = require("mongoose");

var tripSchema = mongoose.Schema({
  tripDistance: String,
  tripName: {
    type: String,
    required: true
  },
  locations: [
    {
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
      }
    }
  ]
});

var Trip = (module.exports = mongoose.model("trip", tripSchema));

module.exports.get = function(callback, limit) {
  Trip.find(callback).limit(limit);
};
