// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/view-place", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view-place.html"));
  });

  //Redirects to page with forms for adding a place and adding a review
  app.get("/add-place", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add-place.html"));
  });

  app.get("/review", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/review.html"));
  });
};
