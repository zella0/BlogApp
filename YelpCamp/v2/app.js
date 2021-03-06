var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds')

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));


//INDEX ROUTE - SHOW ALL CAMPGROUNDS
app.get('/campgrounds', function(req, res){
    Campground.find(function(err, output){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds.ejs", {output});
        }
    });
});

//CREATE - ADD NEW CAMPGROUNDS
app.post('/campgrounds', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name, image, description};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res){
   res.render('new.ejs'); 
});


//SHOW - show one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show.ejs", {campground: foundCampground});
        }
    })
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp homepage!");
});