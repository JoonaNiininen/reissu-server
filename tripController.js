Trip = require("./tripModel");

exports.index = function(req, res) {
  Trip.get(function(err, locations) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Retrieved trip",
      data: locations
    });
  });
};

exports.new = function(req, res) {
  var trip = new Trip();
  trip.name = req.body.name ? req.body.name : trip.name;
  trip.latitude = req.body.latitude;
  trip.longitude = req.body.longitude;

  trip.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "Added trip",
      data: trip
    });
  });
};

exports.delete = function(req, res) {
  Location.deleteOne(
    {
      _id: req.params.trip_id
    },
    function(err, trip) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Removed trip"
      });
    }
  );
};
