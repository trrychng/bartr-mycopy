var db = require("../models");
    
module.exports = function(app) {


app.get("/items", function (req, res) {
    res.render("items", {
        title: "Post your Item"
    });
})

app.post("/api/items", function (req, res) {

    db.Item.create({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price,
        UserId: 1 //need to be mapped to user session
    }).then(function (results) {


        res.json(results)
    });


});


app.get("/api/items/:itemId?", function (req, res) {
    
    var query = {};
    if(req.params.itemId){
        query= {id: req.params.itemId}
    }


    db.Item.findAll({
        where: query
      }).then(function(dbPost) {
        console.log(dbPost);
        res.json(dbPost);
      });


})








};




