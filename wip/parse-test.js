const fs = require('fs');
const papa = require('papaparse');


// Read CSV and parse
const config_file = './data/packaged-goods.csv';
var parsed = {};
try {
    const data = fs.readFileSync(config_file, 'utf-8');
    console.log("read:", config_file);
    parsed = papa.parse(data, {
        header: true
    });
    // console.log(parsed);
    // parsed.data
    //       .errors
    //       .meta
} catch (err) {
    console.log(err);
}

function isDairy(product) {
    return product['industry'] == 'dairy';
}

console.log(typeof(parsed.data), "Array:", Array.isArray(parsed.data));
console.log(parsed.data.slice(0,3));
//console.log(parsed.data.find(isDairy));


// Write JSON
const json_file = './data/packaged-goods.json';
try {
    fs.writeFileSync(json_file, JSON.stringify(parsed.data, null, 2));
    console.log("written:", json_file);
} catch (err) {
    console.log(err);
}


// Read JSON and parse
try {
    const json_data = fs.readFileSync(json_file, 'utf-8');
    // console.log(json_data);
    console.log("read:", json_file);
    parsed = JSON.parse(json_data);
    const packaged_goods = parsed[0];
    console.log(typeof(parsed), "Array:", Array.isArray(parsed));
    console.log(parsed.slice(0,3));
    console.log(typeof(packaged_goods), "Array:", Array.isArray(packaged_goods));
    //console.log(packaged_goods.find(isDairy));
} catch (err) {
    console.log(err);
}


/*
function(err, data) {
    if(!err) {

        var parsed_data = papa.parse(config_file, {
                step: function(row) {
                    console.log("Row", row.data);
                },
                complete: function() {
                    console.log("done");
                }
            });
        console.log(parsed_data);
    } else {
        console.log(err);
    }
});
*/