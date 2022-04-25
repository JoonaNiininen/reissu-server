require("dotenv").config({
  path: "apikey.env"
});

Trip = require("./tripSchema");
TripFunctions = require("./tripFunctions");

exports.index = function(req, res) {
  Trip.find(function(err, trips) {
    if (err) {
      res.json({
        status: "error"
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
  body = req.body;
  var tripId = body.tripDate;
  var locations = body.locations;
  var user = body.userName;
  Trip.updateOne(
    { tripDate: tripId, userName: user },
    {
      $push: {
        locations: { $each: locations }
      }
    },
    { upsert: true },
    function(err) {
      if (err) {
        res.json("Couldn't create trip");
        return;
      }
    }
  );

  TripFunctions(user, locations, tripId);
  res.json({
    message: "Successfully added trip"
  });
};

exports.delete = function(req, res) {
  Trip.deleteOne(
    {
      _id: req.params.trip_id
    },
    function(err, trip) {
      if (err) res.send("error");
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
