var db = require("../models");

module.exports = function (app) {

    app.get("/additem", authenticationMiddleware(), function (req, res) {
        res.render("item_add", {
            title: "Post your Item"
        });
    })

    app.post("/api/items", function (req, res) {


        db.User.find({

            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            var currentUserId = results.id

            db.Item.create({
                itemName: req.body.itemName,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                UserId: currentUserId

            }).then(function (results) {
                res.json(results)
            });

        });
    });



    app.get("/items", function (req, res) {


        db.Item.findAll({
            include: [{
                model: db.User
            }]
        }).then(function (dbPost) {
            console.log(dbPost.User);
            let itemDate = {
                Item: dbPost
            }
            res.render("items", itemDate);
        });


    })







    app.get("/api/items/:itemId?", function (req, res) {

        var query = {};
        if (req.params.itemId) {
            query = {
                id: req.params.itemId
            }
        }


        db.Item.findAll({
            where: query,
            include: {
                model: db.User,
                model: db.Offers
            }



        }).then(function (dbPost) {
            res.json(dbPost);
        });


    })








};




function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
        req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}