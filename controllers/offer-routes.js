var db = require("../models");

module.exports = function (app) {

    app.post("/api/offers/:itemId", function (req, res) {
        random = Math.floor(Math.random() * 1234) + 1
        console.log(random)
        var fileThing = ""
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        if (req.files.uploaded_offer) {
            let sampleFile = req.files.uploaded_offer;

            fileThing = '/assets/img/offers/' + random + req.session.passport.user.userName + sampleFile.name

            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('./public/assets/img/offers/' + random + req.session.passport.user.userName + sampleFile.name)
        } else {
            res.render('/items')
        }


        let itemId = req.params.itemId


        db.User.find({

            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            var currentUserId = results.id

            db.Offers.create({
                userOffer: req.body.offerDescription,
                ItemId: itemId,
                UserId: currentUserId,
                imgSource: fileThing

            }).then(function (results) {
                res.redirect("/profile")
            });

        });
    });






    app.put("/api/offers/accept", function (req, res) {
        let ItemId
        db.Offers.find(

            {
                where: {
                    id: req.body.id
                }
            }).then(function (results) {
            ItemId = results.ItemId
         
        

        db.Item.update({
            isSold: true
        }, {
            where: {
                id: ItemId
            }
        }).then(function (results) {





            res.json(results)
            
        })
        
    })
  

    });



    app.put("/api/offers/decline", function (req, res) {


        console.log(req.body.id)
        db.Offers.update({
            offerStatus: true
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (results) {

        })

    });













}