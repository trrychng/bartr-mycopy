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

app.get("/editprofile", function (req, res) {
    db.User.find({
        where: {
            userName: req.session.passport.user.userName
        }
    }).then(function (results) {
        let userItems = {
            userItems: results
        }
        res.render("editprofile", {
            userItems: userItems
        })
    })
})

app.post("/editprofile", function (req, res) {
    console.log(req.body)
            var fileThing = ""
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            if (req.files.uploaded_newprofile) {

                let sampleFile = req.files.uploaded_newprofile;

                fileThing = '/assets/img/profile/' + req.body.username + sampleFile.name

                // Use the mv() method to place the file somewhere on your server
                sampleFile.mv('./public/assets/img/profile/' + req.body.username + sampleFile.name)
            } else {

                fileThing = req.body.imgSource
            }
                db.User.update({
                    userName: req.body.username,
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    imgSource: fileThing},
                    {where: {userName: req.session.passport.user.userName}
                }).then(function (results) {
                    res.render("profile")

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


// app.delete("/api/items/:id"), function(req, res){
//     console.log(inputted + "hey this inputted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
  
  
//     db.Item.destroy({
//         where: {
//             id: req.params.id
//         }
//         }).then(function(results){
//             res.redirect("/items")
//         })
//   }








function authenticationMiddleware() {
    return (req, res, next) => {
        // console.log(`
        // req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}