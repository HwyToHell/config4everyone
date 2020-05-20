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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static(__dirname + "/public"));
/*if (!module.parent) {
    app.use(logger("dev"));
}*/

// Read JSON and parse
// TODO move to db
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

// select industries and good types from template for application
// customization for specific application or customer
const industries_selection = ["beverage", "food", "dairy"];
const goods_selection = ["liquid", "paste"];

function selectIndustries(key, selection) {
    return function(industry) {
        return selection.includes(industry[key]);
    };
}
const selectIndustriesByIndustry = selectIndustries("industry", industries_selection);

function selectGoods(key, selection) {
    return function(good) {
        return selection.includes(good[key]);
    };
}
const selectGoodsByGoodsType = selectGoods("goods type", goods_selection);
const selectGoodsByIndustry = selectGoods("industry", industries_selection);

function selectTypes(key, selection) {
    return function(type) {
        return type[key].some(function(elem) {
            return selection.includes(elem);
        });
    };
}
const selectTypesByGoodsType = selectTypes("goods type", goods_selection);

let industries = template.industries.filter(selectIndustriesByIndustry);
let packaged_goods = template.packaged_goods.filter(selectGoodsByGoodsType).filter(selectGoodsByIndustry);
let package_types = template.package_types.filter(selectTypesByGoodsType);
//console.log(package_types);

// prepare configuration data for viewing and selecting in front end
function addView(array) {
    array.forEach(function(element) {
        element.view = true;
        element.selected = false;
    });
    return array;
}

let industries_view = addView(industries);
//console.log(industries_view);

// MODEL
// generate unique ID (will be provided by db in production version)
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
    // TODO not implemented yet
    return {
        id: uniqueId.get(),
        industries: industries,
        packaged_goods: packaged_goods,
        package_types: template.package_types,
        machine_types: template.machine_types,
        machine_options: template.machine_options
    };
}



// ROUTES
app.get("/", function(req, res) {
    //res.send("landing page") // debug only
    //res.redirect("/configurations");
    res.render("index");
});


// INDEX
app.get("/configurations", function(req, res) {
    console.log("INDEX route");
    res.render("configurations/index");
});


// NEW
app.get("/configurations/new", function(req, res) {
    console.log("NEW route");
    //res.send("redirecting to POST /configurations");
    res.render("configurations/new");
});


// CREATE
app.post("/configurations", function(req, res) {
    console.log("CREATE route");

    configurations.push(createConfig(template));
    id_current = configurations[configurations.length - 1].id;

    // redirect to EDIT route: /configurations/id
    res.redirect(`/configurations/${id_current}/edit`);
});


// SHOW
app.get("/configurations/:id", function(req, res) {
    console.log("SHOW route");
    res.render("configurations/show", {
        industries: template.industries,
        goods: template.packaged_goods,
        types: template.package_types
    });
});


// EDIT
app.get(`/configurations/:${id_current}/edit`, function(req, res) {
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
app.post("/configurations/:id", function(req, res) {
    console.log("POST");
    console.log(req.body.selected);
});


// NOT FOUND
app.get("*", function(req, res) {
    res.send("404 not found");
});


app.listen(port, function() {
    console.log(`listening at http://localhost:${port}`);
});

// service layer
// TODO move to other module
function adjustConfig(selection, config) {
    // IN frontend selected elements
    // OUT configuration
    return {
        id: uniqueId,
        industries: industries,
        packaged_goods: packaged_goods,
        package_types: template.package_types,
        machine_types: template.machine_types,
        machine_options: template.machine_options
    };

    // filter packaged_goods by industry
    // selection: industry
    // filter package_types by goods_type
}