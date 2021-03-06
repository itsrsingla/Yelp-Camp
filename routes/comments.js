var express = require("express");
var router  = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");   // no need to write index.js

// NEW COMMENT ROUTE

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new",{ campground : campground});
        }
    });
});
 // CREATE COMMENT ROUTE
 
 router.post("/",middleware.isLoggedIn,function(req,res){
     Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;             // new thing by associating comment with user
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        } 
         
     });
 });
 // EDIT ROUTE
 router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComm){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{ campground_id : req.params.id,
                                               comment : foundComm}); 
        }
    });
 });
 // UPDATE ROUTE
 router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComm){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
        
     });
 });
 
// DELETE ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;