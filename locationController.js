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
      message: "Retrieved location",
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
      message: "Added location",
      data: location
    });
  });
};

exports.delete = function(req, res) {
  Location.deleteOne(
    {
      _id: req.params.location_id
    },
    function(err, location) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Removed location"
      });
    }
  );
};
