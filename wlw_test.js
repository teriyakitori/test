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
		$.get( batdom, function(tmpdata){
			console.log("てすと１：" + $(".mtc_detail_store").text() );
		});
		console.log( batdom.match(/マリン/i) );
	}
	else{
	
	}
}
alert("処理終了");
