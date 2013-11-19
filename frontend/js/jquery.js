var jq = $.noConflict();
jq(document).ready(function(){
    jq("button.nav_header").click(function() {
        var content = jq(".main_content");
        var title = jq(this).text();
        content.empty();
        content.html("<h1>" + title +  "</h1>");
    });
    
    jq(".dropdown-menu a").click(function() {
        jq(".dropdown-menu a.active").removeClass("active");
        jq(this).addClass("active");
        showBord(jq(".dropdown-menu a.active").text() + getContent()); //getContent(): at script.js
    });
});

function showBord(name) {
    jq(".main_content").html(
            "<div class=\"row\">" +
                "<div class=\"col-md-1\"></div>" +
                "<h1 class=\"col-md-10\">" + name + "</h1>" +
                "<div class=\"col-md-1\"></div>" +
            "</div>" +                
            "<div class=\"row\">" + 
                "<div class=\"col-md-1\"></div>" +
                " <div class=\"col-md-10\">" +  
                    "<section class=\"container board_border\">" +
                        "<section class=\"row board_background\"></section>" +
                    "</section>" +
                "</div>" +
                "<div class=\"col-md-1\"></div>" +
            "</div>"
);
}