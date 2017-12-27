var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
    {
        name : "Camp1",
        image: "http://images.dailyhive.com/20160803155728/The-view-from-Nairn-Falls-campground-Se%CC%81bastien-Launa-Flickr.jpg",
        description: "description1"
    },
    {
        name : "Camp2",
        image: "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/Bockman-Campground-Ben-Flickr-OutThere-Colorado.jpg",
        description: "description2"
    },
    {
        name : "Camp3",
        image: "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/Arapaho-Bay-Campground-Lake-Granby-Misty-Faucheux-Flickr-OutThere-Colorado.jpg",
        description: "description3"
    }   
]
function seedDB(){
    //Remove all campgrounds
        Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
    })
    //Add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added campgrounds");
                //Add comments
                Comment.create(
                    {
                        text: "Comment1",
                        author: "Author1"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Created a new comment');
                        }
                    })
            }
        })
    })
}

module.exports = seedDB;