require('dotenv').config();
var express               = require("express"),
    app                   =  express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    Comment               = require("./models/comment"),
    Campground            = require("./models/campground");
    // seedDB                = require("./seed");
// requiring routes    
var campgroundRoutes      = require("./routes/campgrounds");
var commentRoutes         = require("./routes/comments");
var indexRoutes           = require("./routes/index");

// mongoose.connect("mongodb://localhost/Camp_app");
const Password = process.env.PASSCODE;
const url = "mongodb+srv://" + Password +"@cluster0.holay.mongodb.net/YelpCampDB";
console.log(url);
mongoose.connect(url,{ useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "hereis my Yelp Camp",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


// General route
app.get("/",function(req,res){
    res.redirect("/landing");
});

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("server is started");
// });

app.listen(process.env.PORT || 3000,function(){
    console.log("server is started");
});
