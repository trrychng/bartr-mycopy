var db = require("../models");

module.exports = function (app) {

    app.post("/api/offers/:itemId", function (req, res) {

        let itemId = req.params.itemId

        console.log(req.body);

        db.User.find({

            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            var currentUserId = results.id

            db.Offers.create({
                userOffer: req.body.offerDescription,
                ItemId: itemId,
                UserId: currentUserId

            }).then(function (results) {
                res.json(results)
            });

        });
    });









};