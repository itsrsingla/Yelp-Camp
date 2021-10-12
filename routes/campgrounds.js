var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");   // no need to write index.js

// INDEX CAMPGROUND ROUTE 
router.get("/",function(req,res){
    // get data from database
    Campground.find({},function(err,campsites){
    if(err){
       console.log("there is a error");
   } else {
       res.render("campgrounds/index", { campgrounds: campsites});
   }
});
    
});

// NEW CAMPGROUND ROUTE
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

// CREATE CAMPGROUND ROUTE
router.post("/",middleware.isLoggedIn, function(req,res){
    var name = req.body.campname;
    var price = req.body.campprice;
    var image = req.body.campimg;
    var description = req.body.campdes;
    var author = { id : req.user._id,
                    username : req.user.username};
    var camp = { name : name , price : price , image : image, description : description, author : author };
    Campground.create(camp,function(err,campsite){
                            if(err){
                                console.log("there is a error");
                            } else {
                                req.flash("success","Campground added");
                                res.redirect("/campgrounds/" + campsite._id);
  }
});

});

// SHOW CAMPGROUND ROUTE
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).
        populate("comments").
        exec(function(err,foundCamp){
        if(err){
            console.log("not found");
        } else {
            res.render("campgrounds/show",{campgrounds: foundCamp});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCamp){
        if(err){
            console.log(err);
            res.redirect("back");
        }else
            res.render("campgrounds/edit", { campground : foundCamp});
    });
});

// UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
        if(err)
            res.redirect("back");
        else
            req.flash("success","Campground updated");
            res.redirect("/campgrounds/" + req.params.id);
    });
});

// DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.redirect("back");
        else
            req.flash("success","Campground deleted");
            res.redirect("/campgrounds");
    });
});



module.exports = router;