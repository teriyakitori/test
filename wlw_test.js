javascript:
var request = null;
var dom_parser = new DOMParser();
request= new XMLHttpRequest();
var urlstr = "https://wonderland-wars.net/matchlogdetail.html?id=16918436";

request.open("GET", urlstr, true);
request.onreadystatechange=sorceget;
request.send(null);

function sorceget(){
	if (request.readyState == 4 && request.status == 200){
		var teststr = null;
		var batdom = request.responseText;
		
		jQuery(function ($) {
			$(teststr).load(batdom, ".mtc_detail_map");
		});
		console.log("てすと１：" + teststr);
	} else {
		
	}
}
