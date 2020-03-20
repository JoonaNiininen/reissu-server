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
  body = req.body;
  var tripId = req.body.tripName;
  var locations = body.locations;

  for (i = 0; i < body.locations.length; i++) {
    Trip.updateOne(
      { tripName: body.tripName },
      {
        $push: {
          locations: {
            name: body.locations[i].name,
            latitude: body.locations[i].latitude,
            longitude: body.locations[i].longitude
          }
        }
      },
      { upsert: true },
      function(err) {
        if (err) {
          res.json(err);
          console.log(err);
          return;
        }
      }
    );
  }

  res.json({
    message: "Successfully added trip"
  });

  getDistance(locations, tripId);

  //var tripDistance = getDistance(locations);
  //console.log(tripDistance + " DISTANCE");
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

function getDistance(locations, tripId) {
  var locationArray = [];
  var temporaryLatitude;
  var temporaryLongitude;
  var newArray = [];
  var homeCoords = [[23.607845, 64.015312]];
  var totalKm = 0;
  locationArray = locationArray.concat(homeCoords);

  for (i = 0; i < locations.length; i++) {
    temporaryLatitude = body.locations[i].latitude;
    temporaryLongitude = body.locations[i].longitude;
    newArray = [[temporaryLongitude, temporaryLatitude]];
    locationArray = locationArray.concat(newArray);
  }

  locationArray = locationArray.concat(homeCoords);
  var locationsQuery = "";
  locationsQuery = JSON.stringify(locationArray);

  var request = require("request");

  request(
    {
      method: "POST",
      url: "https://api.openrouteservice.org/v2/matrix/driving-car",
      body:
        '{"locations":' +
        locationsQuery +
        ',"metrics":["distance"],"units":"km"}',
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization:
          "5b3ce3597851110001cf6248f5dde61d0afc45129e4516211279205b",
        "Content-Type": "application/json; charset=utf-8"
      }
    },
    function(error, response, body) {
      var data = JSON.parse(body);
      var ii = 0;
      for (i = 0; i < locations.length + 2; i++) {
        if (i != locations.length + 1) {
          ii = i + 1;
          totalKm = totalKm + data.distances[i][ii];
          console.log(totalKm);
        }
      }
      console.log(totalKm);
      Trip.updateOne({ tripName: tripId }, { tripDistance: totalKm }, function(
        err
      ) {
        if (err) {
          res.json(err);
          console.log(err);
          return;
        }
        console.log("DB Updated with trip distance");
      });
    }
  );

  //console.log(totalKm);
  //return totalKm;
}
