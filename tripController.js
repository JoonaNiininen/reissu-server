Trip = require("./tripModel");

exports.index = function(req, res) {
  Trip.find(function(err, trips) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Retrieved trips",
      data: trips
    });
  });
};

exports.new = function(req, res) {
  var trips = {};
  trips.locations = {};
  trips.locations.location = {};
  trips.locations.location.name = req.body.name;
  trips.locations.location.latitude = req.body.latitude;
  trips.locations.location.longitude = req.body.longitude;

  Trip.updateOne(
    { tripName: req.body.tripName },
    {
      $push: trips
    },
    { upsert: true },
    function(err, data) {
      if (err) res.json(err);
      res.json(data);
    }
  );
};

exports.delete = function(req, res) {
  Trip.deleteOne(
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

exports.deleteAll = function(req, res) {
  Trip.deleteMany(function(err, trip) {
    {
    }
    if (err) res.send(err);
    res.json({
      status: "success",
      message: "Removed all trips"
    });
  });
};
