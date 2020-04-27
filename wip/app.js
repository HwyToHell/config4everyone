var express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    fs = require("fs"),
    app = express(),
    port = 3000,
    opts_available = {
        packaged_goods: [],
        package_types: [],
        machine_types: [],
        machine_options: [],
        image_paths: {
            packaged_goods: "pictures/packaged-goods/",
            package_types: "pictures/package-types"
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
    file = "./data/package-types.json";
    const json_data = fs.readFileSync(file, "utf-8");
    // console.log(json_data);
    console.log("read:", file);

    opts_available.package_types = JSON.parse(json_data);

    //console.log(opts_available.package_types.slice(0,3));
    //console.log(typeof(opts_available.package_types), "Array:", Array.isArray(opts_available.package_types));
    //console.log(packaged_goods.find(isDairy));
    
} catch (err) {
    console.log(err);
}

try {
    file = "./data/packaged-goods.json";
    const json_data = fs.readFileSync(file, "utf-8");
    // console.log(json_data);
    console.log("read:", file);

    opts_available.packaged_goods = JSON.parse(json_data);

    //console.log(opts_available.packaged_goods.slice(0,3));
    //console.log(typeof(opts_available.package_types), "Array:", Array.isArray(opts_available.package_types));
    //console.log(packaged_goods.find(isDairy));
    
} catch (err) {
    console.log(err);
}

/*opts_available.packaged_goods.forEach(element => {
    console.log(element["packaged good"]);
    console.log(element["image src"]);
});
*/


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
    res.render("configurations/new");
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

// SHOW
app.get("/configurations/:id", function(req, res){
    res.render("packaged-goods", {goods: opts_available.packaged_goods});
});


// UPDATE
app.post("/configurations/:id", function(req, res){
    console.log("POST");
    console.log(req.body.name);
});


/* app.get(/packaged-goods, function(req, res){
res.render("packaged-goods", {goods: opts_available.packaged_goods});
});

app.get("/package-types", function(req, res){
    res.render("package-types", {types: opts_available.package_types});
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