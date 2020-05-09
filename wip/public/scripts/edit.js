var industries = [],
    goods = [],
    types;


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");

    // click handler for selecting visual options
    industries = document.querySelectorAll(".industry");
    //console.log(industry);
    industries.forEach( function(industry) {
        industry.addEventListener("click", function(event) {
            jQuery(this).toggleClass("card-sel");
            industries.push( {
                id: $(this).id,
                selected: false
            });
        });
    });

    // click handler for updating configuration in back-end
    document.querySelector("#update-cfg").addEventListener("click", function(){
        console.log("update button pressed");
        jQuery.post("/configurations/1", {name: "configuration"});
    });
/*    $(".nav-item a").on("show.bs.tab", function() {
        alert("new tab to be shown");
    });
    */
});

console.log("edit.js loaded");

$("#collapseOne").on("show.bs.collapse", function(){
    console.log("collapse 1 shown");
});

$("#collapseOne").on("hide.bs.collapse", function(){
    console.log("collapse 1 hidden");
});