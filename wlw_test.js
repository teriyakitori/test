javascript:

var request = null;
request= new XMLHttpRequest();
var urlstr = "https://wonderland-wars.net/matchlogdetail.html?id=16919588";

request.open("GET", urlstr, true);
request.onreadystatechange=sorceget;
request.send(null);

function sorceget(){
	if (request.readyState == 4 && request.status == 200){
		var batdom = request.responseText;
		$(function() {
			console.log("テスト１：" + $(".mtc_detail_map").text());
		});
		console.log( batdom.match(/マリン/i) );
	}
	else{
	
	}
}
alert("処理終了");
