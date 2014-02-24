//var w;
//function startWorker() {
//if (typeof(Worker)!=="undefined") {
//	if (typeof(w)=="undefined") {
//		w=new Worker("js/backend/webworker_test.js");
//	};
//	w.onmessage=function(event){
//		document.getElementById("servertime").innerHTML=event.data;
//	};
//} else {
//	document.getElementById("servertime").innerHTML="Sorry, your browser does not support Webworkers!";
//};
//};

if (!!window.EventSource) {
	var source = new EventSource("php/SSE_test.php");
	source.onmessage = function(event) {
		document.getElementById("servertime").innerHTML = event.data;
	};
} else {
	document.getElementById("servertime").innerHTML = "Sorry, your browser does not support SSE (Server Sent Events)!";
}