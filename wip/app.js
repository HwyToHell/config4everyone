var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// ROUTES
app.get("/", function(req, res){
    //res.send("landing page") // debug only
    res.render("landing");
});

// test div sizing and alignment
app.get("/div", function(req, res){
    res.render("div");
});

app.get("*", function(req, res){
    res.send("404 not found");
});


app.listen(port, function() {
    console.log(`listening at http://localhost:${port}`);
});