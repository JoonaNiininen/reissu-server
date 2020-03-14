Location = require("./locationModel");

exports.index = function(req, res) {
  Location.get(function(err, locations) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Location retrieved successfully",
      data: locations
    });
  });
};

exports.new = function(req, res) {
  var location = new Location();
  location.name = req.body.name ? req.body.name : location.name;
  location.latitude = req.body.latitude;
  location.longitude = req.body.longitude;

  location.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New location created!",
      data: location
    });
  });
};

exports.update = function(req, res) {
  Location.findById(req.params.location_id, function(err, location) {
    if (err) res.send(err);
    location.name = req.body.name ? req.body.name : location.name;
    location.latitude = req.body.latitude;
    location.longitude = req.body.longitude;

    location.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Location updated",
        data: location
      });
    });
  });
};

exports.delete = function(req, res) {
  Location.remove(
    {
      _id: req.params.location_id
    },
    function(err, location) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Location deleted"
      });
    }
  );
};
