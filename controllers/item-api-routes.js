var db = require("../models");

module.exports = function (app) {

    app.get("/additem", authenticationMiddleware(), function (req, res) {

        db.Category.findAll({


        }).then(function (results) {

            let Category = {
                Category: results
            }
            res.render("item_add", Category)
        })
    })

        app.get("/api/items/my", function (req, res) {


            let Categorydata
            db.Category.findAll({

            }).then(function (data) {
                Categorydata = data
            });


            let query = {}
            if (req.session.passport.user.userName) {
                db.User.find({
                    where: {
                        userName: req.session.passport.user.userName
                    }
                }).then(function (results) {
                    query = {
                        UserId: results.id
                    }
                })
            }


            let openOffers
            db.Item.findAll({
                where: [
                    query
                ],
                include: [{
                        model: db.Offers,
                        include: { model: db.User}
                    },
                    {
                        model: db.User
                    }
                ],
                order: [
                    ['createdAt', 'ASC']
                ]

            }).then(function (dbPost) {
                console.log(dbPost)



                res.json(dbPost);
            });

        })





 

    app.get("/api/items/:itemId?", function (req, res) {

        var query = {};
        if (req.params.itemId) {
            query = {
                id: req.params.itemId
            }
        }


        // db.Item.findAll({
        //     where: query,
        //     include: {
        //         model: db.User
        //     },
        //     include: {
        //         model: db.Category
        //     }



        // }).then(function (dbPost) {
        //     res.json(dbPost);
        // });

        db.Item.findAll({
            include: [{
                all: true,
                nested: true
            }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });






    })




    app.post("/api/items", function (req, res) {
        var fileThing = ""
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        if (req.files.uploaded_image) {
            random = Math.floor(Math.random() * 1111) + 1  
            let sampleFile = req.files.uploaded_image;

            fileThing = '/assets/img/item/'+ random + req.session.passport.user.userName + sampleFile.name

            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('./public/assets/img/item/'+random + req.session.passport.user.userName + sampleFile.name)
        } else {

            fileThing = "/assets/img/item/defaultitem.png"
        }


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
                UserId: currentUserId,
                CategoryId: req.body.inputCategory,
                imgSource: fileThing

            })
        })


        res.redirect("/items");
    });



    app.get("/items/:cat?", function (req, res) {

        var query = {};
        if (req.params.cat) {
            query = {
                Category: req.params.cat
            }
        }



        let Categorydata
        db.Category.findAll({

        }).then(function (data) {
            Categorydata = data
        });


        db.Item.findAll({
            where: [{
                isSold: 0
            }],
            include: [{
                    model: db.Category,
                    where: query
                }, {
                    model: db.User
                },
                {
                    model: db.Offers,
                    include: [{
                        model: db.User
                    }]
                }
            ],
            order: [
                ['createdAt', 'ASC']
            ]

        }).then(function (dbPost) {
            let itemData = {
                Item: dbPost,
                Category: Categorydata
            }

            console.log(itemData + "here data")
            res.render("items", itemData);
        });

    })



    // app.put("/api/items", function (req, res) {
    //     console.log(req.body.id)
    //     db.Item.update(
    //         req.body, {
    //             where: {
    //                 id: req.body.id
    //             }
    //         }).then(function (results) {
    //         res.redirect("/items")
    //     })
    // });

    app.get('/upload', function (req, res) {


        res.render("upload");
    });



    // app.post('/upload', function(req, res) {

    //     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //     let sampleFile = req.files.uploaded_image;

    //     // Use the mv() method to place the file somewhere on your server
    //     sampleFile.mv('./public/assets/img/item/test1.png', function(err) {


    //         db.User.find({

    //             where: {
    //                 userName: req.session.passport.user.userName
    //             }
    //         }).then(function (results) {
    //             var currentUserId = results.id

    //             db.Item.create({
    //                 itemName: req.body.itemName,
    //                 description: req.body.description,
    //                 price: req.body.price,
    //                 location: req.body.location,
    //                 UserId: currentUserId,
    //                 CategoryId: req.body.inputCategory,
    //                 imgSource: '/assets/img/item/test1.png'

    //             })
    //         })


    //         res.redirect("/items");
    //     });
    //   });



};






function authenticationMiddleware() {
    return (req, res, next) => {
        // console.log(`
        // req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}