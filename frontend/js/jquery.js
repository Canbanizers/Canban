var jq = $.noConflict();
jq(document).ready(function(){

	jq("header.nav").click(function() {
		var content = jq(".main_content");
		var title = jq(this).text();
		content.empty();
		content.html("<h1>" + title +  "</h1>");
	});

	jq("article.nav_item").click(function() {
		jq("article.active_nav_item").removeClass("active_nav_item");
		jq(this).addClass("active_nav_item");
		showBord(jq("article.active_nav_item").text() + getContent()); //getContent(): at script.js
	});
});

function showBord(name) {
	jq(".main_content").html("<h1 class=\"bord_header\">" + name + "</h1>" +
							"<section class=\"bord_border\">" +
							"<section class=\"bord_background\"></section>" +
							"</section>"
						);
}