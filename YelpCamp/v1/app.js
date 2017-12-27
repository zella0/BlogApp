var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);


app.get('/', function(req, res){
    res.render("landing.ejs");
});

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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {foundCampground});
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp homepage!");
});