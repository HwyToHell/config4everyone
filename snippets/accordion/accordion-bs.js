console.log("accordion-bs.js loaded");

$("#collapseOne").on("show.bs.collapse", function(){
    console.log("collapse 1 shown");
});

$("#collapseOne").on("hide.bs.collapse", function(){
    console.log("collapse 1 hidden");
});