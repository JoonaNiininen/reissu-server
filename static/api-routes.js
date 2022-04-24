let router = require("express").Router();

router.get("/", function(req, res) {
  res.json({
    status: "Connection Success"
  });
});

var tripController = require("./tripController");
var userController = require("./userController");

router
  .route("/trips")
  .get(tripController.index)
  .post(tripController.new)
router.route("/trips/:trip_id").delete(tripController.delete);
router
  .route("/users")
  .get(userController.index)
  .post(userController.createUser)
router.route("/users/coordinates").post(userController.getHomeCoordinates);
router.route("/users/:user_id").delete(userController.deleteUser);

module.exports = router;
