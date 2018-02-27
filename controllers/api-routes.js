var db = require("../models");
var expressValidator = require("express-validator");
var passport = require('passport');

var bcrypt = require('bcrypt');
const saltRounds = 10;

var userSession;

module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render("home", {
            title: "Home"
        });
    })

    app.get("/profile", authenticationMiddleware(), function (req, res) {
        console.log(req.session.passport.user.userName)
        db.User.find({
            where: {
              userName: req.session.passport.user.userName
            }
          }).then(function(results){
            res.render('profile', {
                title: 'Profile',
                user: results.userName,
                email: results.email,
                firstName: results.firstName,
                lastName: results.lastName
            })
          });
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            title: "Login"
        })
    });

    app.post('/login', passport.authenticate("local", {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get("/logout", function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect("/")
    });


    //MOVE ITEMS TO item-api-routes.js
    // app.get("/items", function (req, res) {
    //     res.render("items", {
    //         title: "Items"
    //     });
    // })

    // app.post("/items", function (req, res) {
    //     db.Items.create({


    //     });

    // });

    app.get("/register", function (req, res) {
        res.render("register", {
            title: "Registration"
        });
    });

    app.post("/registernew", function (req, res) {
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, function (err, hash) {
            db.User.create({
                userName: req.body.username,
                password: hash,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }).then(function (results) {
                const user_id = results.id;
                req.login(user_id, function (err) {
                    res.redirect('/');
                });
            });
        });
    });
}

passport.serializeUser(function (user_id, done) {
    done(null, user_id)
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
        req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}

// this code if used properly will help display validation errors, leaving it out for time being until working

// .catch(Sequelize.ValidationError, function (err) {
//     console.log(err + "heres your error")
// })

