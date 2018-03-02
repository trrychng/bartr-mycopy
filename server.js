// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var multer = require("multer")
var busboy = require("then-busboy")
var fileUpload = require('express-fileupload')


var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var bcrypt = require('bcrypt');

var options = {
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "bartr_db"
};

var sessionStore = new MySQLStore(options);

var PORT = process.env.PORT || 3000;

var db = require("./models");

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(fileUpload());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(expressValidator());
app.use(cookieParser());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'kdkaowlalkba',
  resave: false,
  store: sessionStore,
  saveUninitialized: false
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();

});


// Requiring our models for syncing
var db = require("./models");



// Routes
// ================================================== ===========
require("./controllers/api-routes.js")(app);
require("./controllers/item-api-routes.js")(app);
require("./controllers/offer-routes.js")(app);
require("./controllers/html-routes.js")(app);
require("./controllers/category-routes.js")(app);
require("./controllers/edit.js")(app);

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username);
    console.log(password);
    db.User.find({
      where: {
        userName: username
      }
    }).then(function (results) {

      if (results.password.length === 0) {
        done(null, false);
      } else {

        console.log(results.password.toString());
        const hash = results.password.toString();

        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            return done(null, {
              userName: username
            });

          } else {
            return done(null, false);
          }
        });
      }
    })
  }
));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});