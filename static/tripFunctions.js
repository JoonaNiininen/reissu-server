User = require("./userSchema");

module.exports = function setTripDistance(user, locations, tripId) {
  let locationArray = [];
  let totalKm = 0;

  async function homeCoords() {
    let promise = User.findOne({ userName: user }, function(err, users) {
      if (err) throw err;
    });

    let result = await promise;
    return result;
  }
  homeCoords().then(result => {
    locations.map(function(loc) {
      locationArray.push([loc.longitude, loc.latitude]);
    });
    locationArray.push([
      result.homeCoordinates.longitude,
      result.homeCoordinates.latitude
    ]);
    locationArray.unshift([
      result.homeCoordinates.longitude,
      result.homeCoordinates.latitude
    ]);

    var locationsQuery = JSON.stringify(locationArray);
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
          Authorization: "" + process.env.MATRIX_API_KEY,
          "Content-Type": "application/json; charset=utf-8"
        }
      },
      function(error, response, body) {
        if (error) throw error;
        var data = JSON.parse(body);
        var ii = 0;
        for (i = 0; i < locations.length + 2; i++) {
          if (i != locations.length + 1) {
            ii = i + 1;
            totalKm = totalKm + data.distances[i][ii];
          }
        }
        Trip.updateOne(
          { tripName: tripId },
          { tripDistance: totalKm },
          function(err) {
            if (err) {
              response.json(err);
              return;
            }
          }
        );
      }
    );
  });
};
