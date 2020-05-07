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

// test with 3 IDs
console.log(uniqueId.get());
console.log(uniqueId.get());
var a = uniqueId.get();
console.log("a:", a); 