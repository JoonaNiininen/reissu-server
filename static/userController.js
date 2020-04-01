User = require("./userSchema");

exports.index = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Retrieved users",
      data: users
    });
  });
};

exports.getHomeCoordinates = function(req, res) {
  User.findOne({ userName: req.body.userName }, function(err, result) {
    if (err) throw err;
    res.json({
      homeCoordinates: result.homeCoordinates
    });
  });
};

exports.new = function(req, res) {
  body = req.body;

  User.updateOne(
    { userName: body.userName },
    {
      homeCoordinates: body.homeCoordinates
    },
    { upsert: true },
    function(err) {
      if (err) {
        res.json("error");
        return;
      }
    }
  );
  res.json({
    message: "Successfully added user"
  });
};

exports.delete = function(req, res) {
  User.deleteOne(
    {
      _id: req.params.trip_id
    },
    function(err, trip) {
      if (err) res.send("error");
      res.json({
        status: "success",
        message: "Removed user"
      });
    }
  );
};

exports.deleteAll = function(req, res) {
  User.deleteMany(function(err, trip) {
    {
    }
    if (err) res.send("error");
    res.json({
      status: "success",
      message: "Removed all users"
    });
  });
};

exports.deleteUser = function(req, res) {
  User.deleteOne(
    {
      _id: req.params.user_id
    },
    function(err, user) {
      if (err) res.send("error");
      res.json({
        status: "success",
        message: "Removed user"
      });
    }
  );
};
