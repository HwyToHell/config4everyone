var industries = [],
    goods = [],
    types;


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");

    // click handler for selecting visual options
    industries = document.querySelectorAll(".industry");
    //console.log(industry);
    industries.forEach( function(industry) {
        console.log(industry);
        industry.addEventListener("click", function(event) {
            jQuery(this).toggleClass("card-sel");

        });
    });

    // click handler for updating configuration in back-end
    document.querySelector("#update-cfg").addEventListener("click", function(){
        console.log("update button pressed");
        printChecked(".industry");
        jQuery.post("/configurations/1", {name: "configuration"});
    });
});


$("#collapseOne").on("show.bs.collapse", function(){
    console.log("collapse 1 shown");
});

$("#collapseOne").on("hide.bs.collapse", function(){
    console.log("collapse 1 hidden");
});


function printChecked(tile){
    $(tile).each( function(){
        console.log($(this).attr("id"), $(this).hasClass("card-sel"));
    })
}