var industries = [],
    goods = [],
    types;


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");

    // click handler for selecting visual options
    // industries
    industries = document.querySelectorAll(".industry");
    industries.forEach( function(industry) {
        industry.addEventListener("click", function(event) {
            jQuery(this).toggleClass("card-sel");
        });
    });

    // packaged goods
    $(".packaged-good").each( function(idx) {
        $(this).click(function(event) {
            $(this).toggleClass("card-sel");
            console.log($(this).attr("id"));
        });
    });

    // package types
    $(".package-type").each( function(idx) {
        $(this).click(function(event) {
            $(this).toggleClass("card-sel");
        });
    });


    // click handler for updating configuration in back-end
    document.querySelector("#update-cfg").addEventListener("click", function(){
        let selection = [
            selected("industry"),
            selected("packaged-good"),
            selected("package-type"),
        ];
        console.log(selected("industry"));
        jQuery.post("/configurations/1", {selected: selection});
    });
});


$("#collapseOne").on("show.bs.collapse", function(){
    console.log("collapse 1 shown");
});

$("#collapseOne").on("hide.bs.collapse", function(){
    console.log("collapse 1 hidden");
});

function selected(category) {
    let ids = [];
    $("." + category).each(function(){
        if ($(this).hasClass("card-sel")){
            ids.push($(this).attr("id"));
        }
    });
    return {
        category: category,
        ids: ids
    };
}