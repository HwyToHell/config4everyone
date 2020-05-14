let fs = require("fs"),
    template = {
    industries: [],
    packaged_goods: []
}

// Read JSON and parse
try {
    let file = "../wip/data/industries.json",
        json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.industries = JSON.parse(json_data);

    file = "../wip/data/packaged-goods.json";
    json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.packaged_goods = JSON.parse(json_data);
   
} catch (err) {
    console.log(err);
}

//console.log(template.industries);


const industries_selection = [
    "beverage", "food", "dairy"
];

const goods_selection = [
    "liquid",
    "paste"
];


function selectIndustries(key, selection) {
    return function(industry) {
        return selection.includes(industry[key]);
    };
}
const selectIndustriesByIndustry = selectIndustries("industry", industries_selection);

let industries = template.industries.filter(selectIndustriesByIndustry);
//console.log("industries", industries);



function selectGoods(key, selection){
    return function(good){
        return selection.includes(good[key]);
    };
}
const selectGoodsByGoodsType = selectGoods("goods type", goods_selection);
const selectGoodsByIndustry = selectGoods("industry", industries_selection);

let goods = template.packaged_goods.filter(selectGoodsByGoodsType).filter(selectGoodsByIndustry);
//console.log("goods", goods);


// Read JSON and parse
try {
    let file = "../wip/data/package-types.json";
    json_data = fs.readFileSync(file, "utf-8");
    console.log("read:", file);
    template.package_types = JSON.parse(json_data);
   
} catch (err) {
    console.log(err);
}


const goods_selection2 = [
    "powder",
    "dry bulk"
];

// Check if an array contains any element of another array in JavaScript
console.log(template.package_types[0]["goods type"].some(function(elem) {
    return goods_selection2.includes(elem);
}));

// Predicate to check
function selectTypes(key, selection){
    return function(type){
        return type[key].some(elem => selection.includes(elem));
    };
}
const selectTypesByGoodsType = selectTypes("goods type", goods_selection2);
console.log(template.package_types.filter(selectTypesByGoodsType));

