javascript:
var request = null;
var dom_parser = new DOMParser();
request= new XMLHttpRequest();
var urlstr = "https://wonderland-wars.net/matchlogdetail.html?id=16918436";

request.open("GET", urlstr, true);
request.onreadystatechange=sorceget;
request.send(null);

if (request.readyState == 4 && request.status == 200){
	var batdom = request.responseText;
	console.log("test:" + batdom);
	jQuery(function ($) {
		var teststr = $(batdom).$(".mtc_detail_store").text();
	});
	console.log("てすと１：" + teststr);
}
