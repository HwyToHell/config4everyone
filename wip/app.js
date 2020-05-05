var express = require("express"),
    bodyParser = require("body-parser"),
    // logger = require("morgan"),
    fs = require("fs"),
    app = express(),
    port = 3000,
    template = {
        industries: [],
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
    id_current = 0,
    configurations = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(__dirname + "/public"));
/*if (!module.parent) {
    app.use(logger("dev"));
}*/

// Read JSON and parse
try {
    let file = "./data/industries.json",
        json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.industries = JSON.parse(json_data);

    file = "./data/packaged-goods.json";
    json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.packaged_goods = JSON.parse(json_data);

    file = "./data/package-types.json";
    json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.package_types = JSON.parse(json_data);    
} catch (err) {
    console.log(err);
}

// CONTROLLER
// generate unique ID
var uniqueId = (function() {
    var id = 0;
    return {
        get: function() {
            ++id;
            return id;
        }
    };
})();

function createConfig(template) {
    // in:  template
    // out: config with new ID, based on template

    return {
        id: uniqueId.get(),
        industries: template.industries,
        packaged_goods: template.packaged_goods,
        package_types: template.package_types,
        machine_types: template.machine_types,
        machine_options: template.machine_options
    };
}




// ROUTES
app.get("/", function(req, res){
    //res.send("landing page") // debug only
    //res.redirect("/configurations");
    res.render("index");
});

// TEST
app.get("/test", function(req, res){
    var new_config = createConfig(template);
    //res.send(`new config id: ${new_config.id}`);

    res.render("configurations/edit", {
        industries: new_config.industries,
        goods: new_config.packaged_goods,
        types: new_config.package_types
    });

});


// INDEX
app.get("/configurations", function(req, res){
    console.log("INDEX route");
    res.render("configurations/index");
});

// NEW
app.get("/configurations/new", function(req, res){
    console.log("NEW route");
    //res.send("redirecting to POST /configurations");
    res.render("configurations/new");
});

// CREATE
app.post("/configurations", function(req, res){
    console.log("CREATE route");
    // move to CREATE
    configurations.push(createConfig(template));
    id_current = configurations[configurations.length - 1].id;
    
    // redirect to EDIT route: /configurations/id
    //res.send(`/configurations/${id_current}/edit`);
    res.redirect(`/configurations/${id_current}/edit`);
});

// SHOW
app.get("/configurations/:id", function(req, res){
    console.log("SHOW route");
    res.render("configurations/show", {
        industries: template.industries,
        goods: template.packaged_goods,
        types: template.package_types
    });
});

// EDIT
app.get(`/configurations/:${id_current}/edit`, function(req, res){
    console.log("EDIT route");

    var config_current = configurations.find(function(config) {   
        return (config.id === id_current);
    });

    if (config_current === undefined) {
        res.send("configuration not found");
        console.log("cannot get current configuration");
    };

   /* config_current.industries.forEach(function(element) {
        console.log(element.industry);
    });
*/
    res.render("configurations/edit.ejs", {
        industries: config_current.industries,
        goods: config_current.packaged_goods,
        types: config_current.package_types
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