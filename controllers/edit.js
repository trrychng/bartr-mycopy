var db = require("../models");

module.exports = function (app) {
    
    app.get("/edit", authenticationMiddleware(), function (req, res) {
        console.log(req.session.passport)
        db.User.find({
            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function(results){
        db.Item.findAll({
            where: {
                UserId: results.id
            }
        }).then(function(results){
            console.log(results)

            let userItems = {
                userItems: results
            }
          
        res.render("edit", userItems)
     })
    });
});

app.put("/api/items", function(req,res){
    db.Item.update(
        req.body,
        {where: {
            id: req.body.inputItem
        }
    }).then(function(results){
        res.redirect("/items")
    })

});
}




function authenticationMiddleware() {
    return (req, res, next) => {
        // console.log(`
        // req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}