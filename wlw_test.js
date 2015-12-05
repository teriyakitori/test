javascript:

// 実行するURL
var starturl = "https://wonderland-wars.net/matchlog.html";

// データ取得用変数
var request = null;
var batdom = null;
var dom_parser = new DOMParser();
request= new XMLHttpRequest();

var detail_data_drs = null;
var drs_avg = 0;

//本処理
if(urlchk()){
	var batcnt = 0;
	var urlstr = null;
	var pagelinks = 0;
	
	// リンク数を取得
	pagelinks = document.links.length;
	
	console.log("現在のURLは" + location.href.toString() + "です");
	for(var linkcnt=0; linkcnt < pagelinks; linkcnt++){
		urlstr = document.links[linkcnt].toString();
		if(urlstr.match(/matchlogdetail/i)){
			batcnt++;
			request.open("GET", urlstr, false);
			request.onreadystatechange=sorceget;
			request.send(null);
			drs_avg = drs_avg + parseInt(detail_data_drs[0].innerHTML, 10);
			console.log("処理終了：" + urlstr);
		}
	} 
	// alert("対象試合数：" + batcnt + "\nドロー平均使用回数：" + parseInt(drs_avg / batcnt, 10) );
} else {
	alert("ﾅﾝﾃﾞｯ!!");
}

// URLが対戦履歴ページ以外の場合はメッセージを表示する
function urlchk(){
	if(location.href.toString() == starturl){
		console.log("一致しました");
		return true;
	} else {
	alert("実行するページのアドレスが一致しません。\n【WLW】対戦履歴(全国対戦):Wonder.NET ワンダーランドウォーズ\n「https://wonderland-wars.net/matchlog.html」\n上記のページで実行してください。");
		return false;
	}
}

// 対戦履歴詳細のデータを取得
function sorceget(){
	// 店舗名
	var detail_store = null;
	var detail_data_heishi = null;
	var detail_data_cast = null;
	var detail_data_tettai = null;
	
	if (request.readyState == 4 && request.status == 200){
		console.log("準備完了：" + request.responseText.toString());
		batdom = dom_parser.parseFromString(request.responseText, "text/html");
		
		// 変数にデータを入れていく
		detail_store = batdom.getElementsByClassName("mtc_detail_store");
		detail_data_heishi = batdom.getElementsByClassName("mtc_detail_data_heishi");
		detail_data_cast = batdom.getElementsByClassName("mtc_detail_data_cast");
		detail_data_tettai = batdom.getElementsByClassName("mtc_detail_data_tettai");
		detail_data_drs = batdom.getElementsByClassName("mtc_detail_data_drs");
		
		// 表示
		console.log("店舗名：" + detail_store[0].innerHTML + "｜　兵士撃破数：" + detail_data_heishi[0].innerHTML + "｜　撃破数：" + detail_data_cast[0].innerHTML + "｜　撤退数：" + detail_data_tettai[0].innerHTML + "｜　ドローショット数：" + parseInt(detail_data_drs[0].innerHTML, 10) );
	} else {
		
	}
}
