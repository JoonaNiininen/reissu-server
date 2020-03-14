let router = require("express").Router();

router.get("/", function(req, res) {
  res.json({
    status: "Connection Success"
  });
});

var locationController = require("./locationController");

router
  .route("/locations")
  .get(locationController.index)
  .post(locationController.new);
router
  .route("/locations/:location_id")
  .put(locationController.update)
  .delete(locationController.delete);

module.exports = router;
