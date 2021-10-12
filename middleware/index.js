var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

// MIDDELWARE TWO FOR AUTHORIZATON
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCamp){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{ 
                if(foundCamp.author.id.equals(req.user._id))
                    next();
                else{
                    req.flash("error","You are not authorized to do that");
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
              }
        });
    }else
        res.redirect("back");
}

// middle ware  for authorization
middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComm){
            if(err){
                res.redirect("back");
            }else{
                if(foundComm.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You are not authorized to do that");
                    res.redirect("back");
                    }
            }
        });
    }else
        res.redirect("back");
}

//middleware for authentication
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to that!");
    res.redirect("/login");
}

module.exports = middlewareObj;