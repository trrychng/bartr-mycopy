var db = require("../models");

module.exports = function (app) {

    


app.get("/api/category/:category?", function (req, res) {

    // let category ={}
    // if(req.params.catergory){
    // category = req.params.category
    // }

    db.Category.findAll({

        where: {

        }
    }).then(function (results) {
        res.json(results)
    });

});




app.get("/home/:category?", function (req, res) {

    db.Category.find({
        where: {
            Category : req.params.category
        }
    }).then(function (results) {
        db.Item.find({
            where: {
                CategoryId : results.id
            }
        }).then(function (results) {

            let itemData = {
                items: results,
                title: req.params.category
            }
            // console.log(itemData.items + "hey here's this")
            
            res.render("home", itemData);
                }
            )

        })
    })
};