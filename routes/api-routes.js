// Requiring our models and passport as we've configured it
var db = require("../models");
var config = require("../config/config.json");
//var passport = require("../config/passport");

module.exports = function(app) {
  var mapBoxKey = config.mapBox.key;
  console.log(mapBoxKey);
  // PLACE & MAP DATA ROUTES =============================================
  // POST data that is input by the user -> code ajax call for html
  app.post("/api/add-place", function(req, res) {
    console.log("API Routes: " + JSON.stringify(req.body));
    db.Place.create({
      name: req.body.placeName,
      user: req.body.userName,
      description: req.body.placeDescription,
      latitude: req.body.coordinates[0],
      longitude: req.body.coordinates[1]
      // coordinates: {
      //   type: "Point",
      //   coordinates: req.body.coordinates
      // }
    })
      .then(function(dbPlace) {
        console.log("sequelize create success" + dbPlace); // DEL except req. verbose
        res.json(dbPlace);
        console.log("new place posted to /api/add-place"); // DEL except req. verbose
        //res.redirect(307, "/api/view-place");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  // GET data for all places to be rendered in a list (dropdown or otherwise)
  app.get("/api/place", function(req, res) {
    db.Place.findAll({}).then(function(dbPlace) {
      console.log(dbPlace);
      res.json(dbPlace);
    });
  });

  // GET data for place by id -> on landing page, user searches for a place or clicks link with associated place
  app.get("/api/place/:id", function(req, res) {
    db.Place.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPlace) {
      res.json(dbPlace);
    });
  });

  app.delete("/api/place/:id", function(req, res) {
    db.Place.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPlace) {
      res.json(dbPlace);
    });
  });

  // REVIEW & ASSOCIATED PLACE ROUTES ====================================
  app.post("/api/review", function(req, res) {
    console.log("API Route Reviews: " + JSON.stringify(req.body));
    db.Review.create({
      placeId: req.body.placeSelected,
      body: req.body.placeReview,
      title: req.body.reviewTitle

      //rating: 5
    })
      .then(function(dbReview) {
        res.json(dbReview);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/review/:id", function(req, res) {
    console.log("API Route: fetching reviews w/ placeId = " + req.params.id);
    db.Review.findAll({
      where: {
        placeId: req.params.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
  // USER LOGIN & SIGNUP ROUTES ==========================================

  //   app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //     res.json(req.user);
  //   });

  //   app.post("/api/signup", function(req, res) {
  //     db.User.create({
  //       email: req.body.email,
  //       password: req.body.password
  //     })
  //       .then(function() {
  //         res.redirect(307, "/api/login");
  //       })
  //       .catch(function(err) {
  //         res.status(401).json(err);
  //       });
  //   });

  //   app.get("/logout", function(req, res) {
  //     req.logout();
  //     res.redirect("/");
  //   });

  //   app.get("/api/user_data", function(req, res) {
  //     if (!req.user) { // Use if we want User login
  //       res.json({});
  //     } else {
  //       res.json({
  //         email: req.user.email,
  //         id: req.user.id
  //       });
  //     }
  //   });
};
