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
	jq(".main_content").html("<h1 class=\"board_header\">" + name + "</h1>" +
							"<section class=\"board_border\">" +
							"<section class=\"board_background\"></section>" +
							"</section>"
						);
}