var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(
      result
  ) {
      res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {

  var condition = "id = " + req.params.id;

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

















// Export routes for server.js to use.
module.exports = router;
