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
console.log("industries", industries);



function selectGoods(key, selection){
    return function(good){
        return selection.includes(good[key]);
    };
}
const selectGoodsByGoodsType = selectGoods("goods type", goods_selection);
const selectGoodsByIndustry = selectGoods("industry", industries_selection);

let goods = template.packaged_goods.filter(selectGoodsByGoodsType).filter(selectGoodsByIndustry);
console.log("goods", goods);




/*
function or(p1, p2) {
    return function(x) {
        return p1(x) || p2(x);
    
}

function negative(x) {
    return x < 0;
}
function positive(x) {
    return x > 0;
}
var nonzero = or(negative, positive);

console.log(nonzero(-5)); // true
console.log(nonzero(0));  // false
console.log(nonzero(5));  // true

// innerFcn: selectIndustry(element-of-industries)
// var selectIndustry = 
*/