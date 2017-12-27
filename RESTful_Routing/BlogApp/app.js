var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');
var methodOverride   = require('method-override')
var expressSanitizer = require('express-sanitizer');

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


app.get('/', function(req, res){
    res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', function(req, res){
    Blog.find(function(err, blogs){
        if(err){
            console.log(err);
            console.log("Error");
        } else {
            res.render('index.ejs', {blogs});
        }
    })
});

// NEW ROUTE
app.get('/blogs/new', function(req, res){
    res.render('new.ejs');
});

///CREATE ROUTE
app.post('/blogs', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect('/blogs');
        }
    })
});


//SHOW ROUTE
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show.ejs', {foundBlog});
        }
    })
});

// EDIT ROUTE
app.get('/blogs/:id/edit', function (req, res){
    Blog.findById(req.params.id, function(err, editedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit.ejs', {editedBlog});
        }
    })
})

// UPDATE ROUTE  findByIAndUpdate(id, newdata, callback)
app.put('/blogs/:id', function (req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    })
})

// DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('blogs');
        } else {
            res.redirect('blogs');
        }
    })
})

app.listen(3000, function(){
    console.log("Server up!");
});
