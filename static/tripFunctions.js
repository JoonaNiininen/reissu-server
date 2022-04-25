User = require("./userSchema");
var TripLengthUrl = "https://api.openrouteservice.org/v2/matrix/driving-car";

module.exports = function setTripDistance(username, locations, tripId) {
  let locationArray = [];
  let totalKm = 0;

  async function homeCoords() {
    let promise = User.findOne({ userName: username }, function(err) {
      if (err) throw err;
    });

    let userRec = await promise;
    return userRec;
  }
  
  homeCoords().then(userRec => {
    if (userRec == null) {
      return;
    }
    locationArray.push([
      userRec.homeCoordinates.longitude,
      userRec.homeCoordinates.latitude
    ]);
    //
    locations.map(function(loc) {
      locationArray.push([
        loc.longitude,
        loc.latitude]); 
    });
    //
    locationArray.push([
      userRec.homeCoordinates.longitude,
      userRec.homeCoordinates.latitude
    ]);
    var request = require("request");
    request(
      {
        method: "POST",
        url: TripLengthUrl,
        body:
          '{"locations":' +
          JSON.stringify(locationArray) +
          ',"metrics":["distance"],"units":"km"}',
        headers: {
          Accept:
          "application/json",
          Authorization: process.env.MATRIX_API_KEY,
          "Content-Type": "application/json; charset=utf-8"
        }
      },
      function(error, response, body) {
        if (error) console.log(error);
        var data = JSON.parse(body);
        for (i = 0; i < locations.length + 2; i++) {
          if (i != locations.length + 1) {
            totalKm = totalKm + data.distances[i][i+1];
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
