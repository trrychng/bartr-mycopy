var db = require("../models");
var expressValidator = require("express-validator");
var passport = require('passport');

var bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require("nodemailer");
var homeInfo = {}

var userSession;

function executeEmail(name, email) {

    var output = `
        <p>You have signed up!</p>
        <h3>Your Details</h3>
        <ul>
            <li>${name}</li>
            <li>${"whatever"}</li>
        </ul>`;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'seandillon1224@gmail.com', // generated ethereal user
            pass: 'Brandnew1224' // generated ethereal password
        }
    });
    console.log(transporter);
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"nodemailer contact" <seandillon1224@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        // console.log('Message sent: %s', info.messageId);
        // // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // res.render("login", {
        //     msg: "Email on the way"
        // })
        console.log(error)

    });
    console.log('mail will go here.')
};

module.exports = function (app) {
    app.get("/", function (req, res) {



        db.Category.findAll({

        }).then(function (results) {
            res.render('home',
                homeData = {
                    title: 'Home',
                    Category: results
                })
        });

    })

    app.get("/profile", authenticationMiddleware(), function (req, res) {
        db.User.find({
            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            res.render('profile',
                profileData = {
                    title: 'Profile',
                    profile: results
                })
        });
    });


    app.get("/1", function (req, res) {


        let Categorydata
        db.Category.findAll({

        }).then(function (data) {
            Categorydata = data
        });
        

        let query = {}
        if(req.session.passport.user.userName){
        db.User.find({
            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
             query = {UserId : results.id}
        })
    }


        let openOffers
        db.Item.findAll({
             where: {
                query,
                isSold : 0
             },
             include: [
                 {model: db.Offers},
                {model: db.User}
            ],
            order: [
                ['createdAt', 'ASC']
            ]
            
        }).then(function (dbPost) {
            console.log(dbPost)

    



            res.render('home',
            homeData = {
                title: 'Home',
                Category: Categorydata
            })
        });

    })





















    app.get('/login', function (req, res) {
        res.render('login', {
            title: "Login"
        })
    });

    app.post('/login', passport.authenticate("local", {
        successRedirect: '/profile',
        failureRedirect: '/'
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

                executeEmail(results.userName, results.email)
                res.render("login", {
                    msg: "Email on the way"
                })


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
        // console.log(`
        // req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}

// this code if used properly will help display validation errors, leaving it out for time being until working

// .catch(Sequelize.ValidationError, function (err) {
//     console.log(err + "heres your error")
// })