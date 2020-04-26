var industries =[];


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");

    industries = document.querySelectorAll(".industry");
    //console.log(industry);
    industries.forEach( function(industry) {
        industry.addEventListener("click", function(event) {
            jQuery(this).toggleClass("card-sel");
            //jQuery(this).find("hr").toggleClass("selected");
            //jQuery(this).find(".card-header").toggleClass("text-primary");
        });
    });

/*    $(".nav-item a").on("show.bs.tab", function() {
        alert("new tab to be shown");
    });
    */
});


