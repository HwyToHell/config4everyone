var express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    fs = require("fs"),
    app = express(),
    port = 3000,
    available = {
        packaged_goods: [],
        package_types: [],
        machine_types: [],
        machine_options: [],
        image_paths: {
            industries: "images/packaged-goods/",
            packaged_goods: "images/packaged-goods/",
            package_types: "images/package-types/"
        }
    },
    config_id = 0,
    configurations = [];

console.log(__dirname);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(__dirname + "/public"));
if (!module.parent) {
    app.use(logger("dev"));
}

// Read JSON and parse
try {
    let file = "./data/industries.json",
        json_data = fs.readFileSync(file, "utf-8");
    // console.log(json_data);
    console.log("read:", file);
    available.industries = JSON.parse(json_data);

    file = "./data/packaged-goods.json";
    json_data = fs.readFileSync(file, "utf-8");
    // console.log(json_data);
    console.log("read:", file);
    available.packaged_goods = JSON.parse(json_data);

    file = "./data/package-types.json";
    json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    available.package_types = JSON.parse(json_data);

    //console.log(available.packaged_goods.slice(0,3));
    //console.log(typeof(available.package_types), "Array:", Array.isArray(available.package_types));
    //console.log(packaged_goods.find(isDairy));
    
} catch (err) {
    console.log(err);
}


// ROUTES
app.get("/", function(req, res){
    //res.send("landing page") // debug only
    //res.redirect("/configurations");
    res.render("index");
});

// INDEX
app.get("/configurations", function(req, res){
    res.render("configurations/index");
});

// NEW
app.get("/configurations/new", function(req, res){
    console.log("NEW route");
    res.render("configurations/new", {
        industries: available.industries,
        goods: available.packaged_goods,
        types: available.package_types
    });
});

// SHOW
app.get("/configurations/:id", function(req, res){
    console.log("SHOW route");
    res.render("configurations/show", {
        industries: available.industries,
        goods: available.packaged_goods,
        types: available.package_types
    });
});

// CREATE
app.post("/configurations", function(req, res){
    // DEBUG

    // get id_new
    var id_new = ++config_id;

    // create configuration with empty selected choices -> selected = []
    var config_new = {
        packaged_goods: [],
        package_types: [],
        machine_types: [],
        machine_options: []
    };
    configurations.push({id_new, config_new});
    
    // redirect to EDIT route: /configurations/id_new
    res.redirect(`/configurations/${id_new}`);
});

// EDIT
app.get("/configurations/::id/edit", function(req, res){
    res.render("configurations/edit", {
        industries: available.industries,
        goods: available.packaged_goods,
        types: available.package_types
    });
});



// UPDATE
app.post("/configurations/:id", function(req, res){
    console.log("POST");
    console.log(req.body.name);
});


/* app.get(/packaged-goods, function(req, res){
res.render("packaged-goods", {goods: available.packaged_goods});
});

app.get("/package-types", function(req, res){
    res.render("package-types", {types: available.package_types});
});
*/

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