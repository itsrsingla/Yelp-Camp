var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

// var data = [
//     {
//         name : "Ladakh",
//         image : "https://www.photosforclass.com/download/px_3574440",
//         description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
//     },
//     {
//         name : "Kashmir",
//         image : "https://www.photosforclass.com/download/px_1431592",
//         description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
//     },
//     {
//         name : "Goa",
//         image : "https://www.photosforclass.com/download/px_4417072",
//         description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
//     },
    
//     ]

// DELETE ALL PREVIOUS FILES
function seedDB(){
    // Comment.remove();
    Campground.remove(function(err){
    if(err)
    console.log(err);
    });
}


// function seedDB(){
//     Comment.remove(function(err,res){
//         if(err)
//             console.log(err);
//         else{
//             console.log("removed all comments");
//             Campground.remove(function(err){
//                 if(err){
//                     console.log("there is an error");
//                 }else{
//                     console.log("deleted all campgrounds");
//                     data.forEach(function(data){
//                         Campground.create(data,function(err,campground){
//                             if(err){
//                                 console.log("we met an error");
//                             }else{
//                                 console.log("campground added");
//                                   Comment.create({
//                                     text : "hey this is beautiful",
//                                 },function(err,comment){
//                                     if(err){
//                                         console.log("do nothing");
//                                     }else{
//                                         comment.author.username = "timothy";
//                                         comment.save();
//                                         campground.comments.push(comment);
//                                         campground.save(function(err,campground){
//                                             if(err){
//                                                 console.log("we met an error");
//                                             }else{
//                                                 console.log("comments added in campgrounds");
//                                                 // console.log(comment);
//                                                 // console.log(campground);
                                                
//                                             }
//                                         }); 
//                                     }
//                                 });
//                             }
//                         });
//                     });
//                 }
//             });
//         }
//     });
// }

module.exports = seedDB;