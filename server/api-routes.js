let router = require("express").Router();

router.get("/", function(req, res) {
  res.json({
    status: "Connection Success"
  });
});

var tripController = require("./tripController");

router
  .route("/trips")
  .get(tripController.index)
  .post(tripController.new)
  .delete(tripController.deleteAll);
router.route("/trips/:trip_id").delete(tripController.delete);

module.exports = router;
