javascript:
var request = null;
request= new XMLHttpRequest();
var myHTML = null;
var urlstr = "https://wonderland-wars.net/matchlogdetail.html?id=16919588";

request.open("GET", urlstr, true);
request.onreadystatechange=sorceget;
request.send(null);

function sorceget(){
	if (request.readyState == 4 && request.status == 200){
		var batdom = request.responseText;
		jQuery(function ($) {
			myHTML = $.parseHTML(batdom.toString());
			alert("testes:" + myHTML.length);
		});
		console.log("test1:" + myHTML);
		var batdel = myHTML.getElementsByClassName("mtc_detail_data_heishi");
		console.log("2兵士撃破数：" + batdel[0].innerHTML);
	}
	else{
	
	}
}
alert("処理終了");
