
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");

    document.querySelector("#create-cfg").addEventListener("click", function(){
        console.log("create button pressed");
        jQuery.post("/configurations", {}, function(data, status){
            alert("data: " + data + "status: " + status);
        });
    });
});