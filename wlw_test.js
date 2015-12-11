javascript:

// 実行するURL
var starturl = "https://wonderland-wars.net/matchlog.html";

var request= new XMLHttpRequest();

// エラー用変数
var errnum = 0;

// データ取得用正規表現リスト
// 対戦時刻
var match_time = /<span class="font_small">.*<\/span>/g;
// 勝敗
var mtc_detail_result = /<div class="mtc_detail_result">.*<\/div>/;
// 自軍レベルアップ時間
var levelup_my_lv = /<div class="levelup_my_lv".*<\/div>/g;
// 敵軍レベルアップ時間
var levelup_enemy_lv = /<div class="levelup_enemy_lv".*<\/div>/g;
// 兵士撃破数
var mtc_detail_data_heishi = /<div class="mtc_detail_data_heishi".*<\/div>/;
// キャスト撃破数
var mtc_detail_data_cast = /<div class="mtc_detail_data_cast".*<\/div>/;
// 撤退数
var mtc_detail_data_tettai = /<div class="mtc_detail_data_tettai".*<\/div>/;
// ストレートショット数
var mtc_detail_data_sts = /<div class="mtc_detail_data_sts".*<\/div>/;
// ストレートショットHIT数
var mtc_detail_data_stshit = /<div class="mtc_detail_data_stshit".*<\/div>/;
// ドローショット数
var mtc_detail_data_drs = /<div class="mtc_detail_data_drs".*<\/div>/;
// ドローショットHIT数
var mtc_detail_data_drshit = /<div class="mtc_detail_data_drshit".*<\/div>/;
// 帰城数
var mtc_detail_data_backhome = /<div class="mtc_detail_data_backhome".*<\/div>/;
// ストレートショット被HIT数
var mtc_detail_data_sts2hit = /<div class="mtc_detail_data_sts2hit".*<\/div>/;
// ドローショット被HIT数
var mtc_detail_data_drs2hit = /<div class="mtc_detail_data_drs2hit".*<\/div>/;
// プレーヤー名
var mp_mydata_name = /<div class="mp_mydata_name">.*<\/div>/g;
// 使用キャスト画像URL
var mtc_detail_cast = /\/img_cast\/.+\.png/g;
// 使用スキル画像URL
var mtc_detail_skill = /\/img_card_thum\/skill\/.+\.png/g;
// スキル使用回数
var mtc_detail_skill_count = /<div class="mtc_detail_skill_count">.*<\/div>/g;
// 使用アシスト画像URL
var mtc_detail_assist = /\/img_card_thum\/assist\/.+\.png/g;
// 使用ソウル画像URL
var mtc_detail_soul = /\/img_card_thum\/soul\/.+\.png/g;

// url格納用文字列
var urlstr = null;
// 対象試合数変数
var battle_cnt = 0;

// 結果を配列で格納する
var result_battle = [];

// 表示用
var innerNode = null;

// 本処理
// 開始URLをチェックし、対戦履歴ページなら処理を開始する
if( urlchk() ){
	alert("OKを押すとデータ取得を開始します。\n読み込みには時間がかかりますのでしばらくお待ちください。\n一分以上経っても処理終了と表示されない場合は、\nエラーが発生した可能性があります。");
	// 対戦履歴のページ数だけ処理する
	for(var linkcnt=0; linkcnt < document.links.length; linkcnt++){
		urlstr = document.links[linkcnt].toString();
		// 対象外のURLも含まれるので、アドレスチェックを行う
		if( urlstr.match(/matchlogdetail/i) ){
			request.open("GET", urlstr, false);
			request.onreadystatechange=sorceget;
			request.send(null);
			// console.log("バトル" + battle_cnt + "：" + parseInt(result_battle[battle_cnt][4]));
			battle_cnt++;
		}
	}
	
	// エラーが無ければ集計処理
	if(errnum == 0){
		var win_cnt = 0;
		var lose_cnt = 0;
		
		var data_heishi = 0;
		var data_cast = 0;
		var data_tettai = 0;
		var data_sts = 0;
		var data_stshit = 0;
		var data_drs = 0;
		var data_drshit = 0;
		var data_backhome = 0;
		var data_sts2hit = 0;
		var data_drs2hit = 0;
		
		/*
		// 味方レベルアップ時間
		for(var time_cnt = 0; time_cnt < 7; time_cnt++){
			if(result_battle[5][2][time_cnt] != undefined){
				console.log("味方LV" + (time_cnt+2) + "：" + parseInt(lvsplit(result_battle[5][2][time_cnt])));
			} else {
				console.log("味方LV" + (time_cnt+2) + "：" + "ないです");
			}
		}
		// 敵レベルアップ時間
		for(var time_cnt = 0; time_cnt < 7; time_cnt++){
			if(result_battle[5][3][time_cnt] != undefined){
				console.log("敵LV" + (time_cnt+2) + "：" + parseInt(lvsplit(result_battle[5][3][time_cnt])));
			} else {
				console.log("敵LV" + (time_cnt+2) + "：" + "ないです");
			}
		}
		*/
		
		for(cnt = 0; cnt < battle_cnt; cnt++){
			// 勝率計算
			if(result_battle[cnt][1] == "win"){
				win_cnt++;
			} else {
				lose_cnt++;
			}
			// 味方レベルアップ時間
			
			// 敵レベルアップ時間
			
			// 兵士撃破数
			data_heishi = data_heishi + parseInt(result_battle[cnt][4]);
			// キャスト撃破数
			data_cast = data_cast + parseInt(result_battle[cnt][5]);
			// 撤退数
			data_tettai = data_tettai + parseInt(result_battle[cnt][6]);
			// ストレートショット数
			data_sts = data_sts + parseInt(result_battle[cnt][7]);
			// ストレートショットHIT数
			data_stshit = data_stshit + parseInt(result_battle[cnt][8]);
			// ドローショット数
			data_drs = data_drs + parseInt(result_battle[cnt][9]);
			// ドローショットHIT数
			data_drshit = data_drshit + parseInt(result_battle[cnt][10]);
			// 帰城数
			data_backhome = data_backhome + parseInt(result_battle[cnt][11]);
			// ストレートショット被HIT数
			data_sts2hit = data_sts2hit + parseInt(result_battle[cnt][12]);
			// ドローショット被HIT数
			data_drs2hit = data_drs2hit + parseInt(result_battle[cnt][13]);
		}
		
		// 表示
		// タイトルを表示
		var inspos  = document.getElementById("page_title");
		var newNode = document.createElement("h2");
		var textNode = document.createTextNode("本気でやっつけてやるんだから！");
		newNode.appendChild(textNode);
		newNode.id = "page_title";
		inspos.parentNode.insertBefore(newNode, inspos);
		
		// 親ノードを生成
		newNode = document.createElement("div");
		newNode.className = "frame02_1";
		
		// 結果領域のタイトルを作成
		var titleNode = document.createElement("div");
		titleNode.className = "frame02_1_title";
		titleNode.innerHTML = "平均データ：対象試合数　" + battle_cnt;
		
		// インナー定義
		innerNode = document.createElement("div");
		innerNode.className = "frame_inner";
		
		addNode("勝利数(合計)", win_cnt);
		addNode("敗北数(合計)", lose_cnt);
		addNode("勝率", (win_cnt*100/battle_cnt).toFixed(2));
		addNode("兵士撃破数", (data_heishi/battle_cnt).toFixed());
		addNode("キャスト撃破数", (data_cast/battle_cnt).toFixed(2));
		addNode("撤退数", data_tettai/battle_cnt);
		addNode("キルレ", (data_cast/data_tettai).toFixed(2));
		addNode("SS使用回数", data_sts/battle_cnt);
		addNode("SSキャストヒット数", data_stshit/battle_cnt);
		addNode("DS使用数", data_drs/battle_cnt);
		addNode("DSヒット数", data_drshit/battle_cnt);
		addNode("帰城数", data_backhome/battle_cnt);
		addNode("SS被弾数", data_sts2hit/battle_cnt);
		addNode("DS被弾数", data_drs2hit/battle_cnt);
		//addNode("", );
		
		// ページに追加
		newNode.appendChild(titleNode);
		newNode.appendChild(innerNode);
		inspos.parentNode.insertBefore(newNode, inspos);
		
		/*
		console.log("対象試合数＝" + battle_cnt + "　勝率＝" + win_cnt*100/battle_cnt + "％　（勝利数＝" + win_cnt + "　敗北数＝" + lose_cnt + "）");
		console.log("兵士撃破総数＝" + data_heishi + "　平均兵士撃破数＝" + data_heishi/battle_cnt);
		console.log("キャスト撃破総数＝" + data_cast + "　撤退総数＝" + data_tettai + "　キルレ＝" + data_cast/data_tettai);
		console.log("平均ストレートショット数＝" + data_sts/battle_cnt + "　平均ストレートショットHIT数＝" + data_stshit/battle_cnt);
		console.log("平均ドローショット数＝" + data_drs/battle_cnt + "　平均ドローショットHIT数" + data_drshit/battle_cnt);
		console.log("平均帰城数＝" + data_backhome/battle_cnt);
		console.log("平均ストレートショット被HIT数＝" + data_sts2hit/battle_cnt + "　平均ドローショット被HIT数＝" + data_drs2hit/battle_cnt);
		*/
	}
	alert("処理終了　エラー番号:" + errnum);
} else {
	alert("ﾅﾝﾃﾞｯ!!");
}

// URLが対戦履歴ページ以外の場合はメッセージを表示する
function urlchk(){
	if(location.href.toString() == starturl){
		return true;
	} else {
	alert("実行するページのアドレスが一致しません。\n【WLW】対戦履歴(全国対戦):Wonder.NET ワンダーランドウォーズ\n「https://wonderland-wars.net/matchlog.html」\n上記のページで実行してください。");
		return false;
	}
}

// 対戦履歴詳細ページの情報を取得
function sorceget(){
	if (request.readyState == 4 && request.status == 200){
		var src_txt = null;
		var result_ary = [];
		var mylv_ary = [];
		var enemylv_ary = [];
		var player = [];
		var skill_use = null;
		var src_ary = [];
		var tmp_ary = [];
		var chkreg = null;
		var cpuchk = [];
		var other_member = [];
		
		var tmpstr = null;
		var cnt = 0;
		
		// ソースをテキストに
		src_txt = request.responseText;
		
		// ソースを2分割
		src_ary = src_txt.split("mtc_detail_member clearfix");
		
		// 試合時刻を取得
		tmpstr = src_ary[0].match(match_time);
		result_ary[0] = tagsplit(tmpstr[0]);
		// 勝敗を取得
		var win_lose = src_ary[0].match(mtc_detail_result);
		if(win_lose[0].match("icon_win.png") != null){
			result_ary[1] = "win";
		} else {
			result_ary[1] = "lose";
		}
		
		// レベルアップ時間を取得
		mylv_ary = src_ary[0].match(levelup_my_lv);
		result_ary[2] = mylv_ary;
		enemylv_ary = src_ary[0].match(levelup_enemy_lv);
		result_ary[3] = enemylv_ary;
		// 兵士撃破数を取得
		tmpstr = src_ary[0].match(mtc_detail_data_heishi);
		result_ary[4] = tagsplit(tmpstr[0]);
		// キャスト撃破数
		tmpstr = src_ary[0].match(mtc_detail_data_cast);
		result_ary[5] = tagsplit(tmpstr[0]);
		// 撤退数
		tmpstr = src_ary[0].match(mtc_detail_data_tettai);
		result_ary[6] = tagsplit(tmpstr[0]);
		// ストレートショット数
		tmpstr = src_ary[0].match(mtc_detail_data_sts);
		result_ary[7] = tagsplit(tmpstr[0]);
		// ストレートショットHIT数
		tmpstr = src_ary[0].match(mtc_detail_data_stshit);
		result_ary[8] = tagsplit(tmpstr[0]);
		// ドローショット数
		tmpstr = src_ary[0].match(mtc_detail_data_drs);
		result_ary[9] = tagsplit(tmpstr[0]);
		// ドローショットHIT数
		tmpstr = src_ary[0].match(mtc_detail_data_drshit);
		result_ary[10] = tagsplit(tmpstr[0]);
		// 帰城数
		tmpstr = src_ary[0].match(mtc_detail_data_backhome);
		result_ary[11] = tagsplit(tmpstr[0]);
		// ストレートショット被HIT数
		tmpstr = src_ary[0].match(mtc_detail_data_sts2hit);
		result_ary[12] = tagsplit(tmpstr[0]);
		// ドローショット被HIT数
		tmpstr = src_ary[0].match(mtc_detail_data_drs2hit);
		result_ary[13] = tagsplit(tmpstr[0]);
		
		/*
		for(cnt = 0; cnt < 14; cnt++){
			console.log("テスト" + cnt + "：" + result_ary[cnt]);
		}
		*/
		
		// プレイヤー情報を取得
		player[0] = false;
		player[1] = src_ary[0].match(mtc_detail_cast);
		player[2] = src_ary[0].match(mtc_detail_skill);
		skill_use = src_ary[0].match(mtc_detail_skill_count);
		player[3] = src_ary[0].match(mtc_detail_assist);
		player[4] = src_ary[0].match(mtc_detail_soul);
		
		// CPUプレイヤーの確認
		for(cnt = 0; cnt < 7; cnt++){
			if(cnt < 3){
				chkreg = new RegExp("id=\"friend_" + cnt + "\"\\s*com=\"false\"");
			} else {
				var enemy_cnt = cnt - 3
				chkreg = new RegExp("id=\"enemy_" + enemy_cnt + "\"\\s*com=\"false\"");
			}
			if(src_ary[1].match(chkreg) == null){
				cpuchk[cnt] = true;
			} else {
				cpuchk[cnt] = false;
			}
			//console.log("CPUチェック" + cnt + "：" + cpuchk[cnt] + "　|　" + chkreg);
		}
		
		// 他プレイヤーのための分割
		tmp_ary = src_ary[1].split("match_detail_member_pop");
		var player_cnt = 0;
		
		// 他プレイヤーのデータを取得
		for(cnt = 0; cnt < 7; cnt++){
			var member_tmp = [];
			member_tmp[0] = cpuchk[cnt];
			// CPUの場合は取得を行わない
			if(member_tmp[0] == false){
				player_cnt++;
				member_tmp[1] = tmp_ary[player_cnt].match(mtc_detail_cast);
				member_tmp[2] = tmp_ary[player_cnt].match(mtc_detail_skill);
				member_tmp[3] = tmp_ary[player_cnt].match(mtc_detail_assist);
				member_tmp[4] = tmp_ary[player_cnt].match(mtc_detail_soul);
				other_member[cnt] = member_tmp;
			} else {
				other_member[cnt] = cpuchk[cnt];
			}
		}
		/*
		for(cnt = 0; cnt < 7; cnt++){
			console.log("てすと" + cnt + "：" + other_member[cnt]);
		}
		*/
		// 結果を格納
		result_battle[battle_cnt] = result_ary;
	} else {
		
	}
}

// 文字列からタグを除去
function tagsplit(getstr){
	var strtmp = null;
	var rtstr = null;
	
	strtmp = getstr.split(">");
	rtstr = strtmp[1].split("<");
	return rtstr[0];
}

// レベルアップ時間を取得
function lvsplit(lvstr){
	var strtmp = null;
	
	strtmp = lvstr.split("width:");
	return strtmp[1]
}

// ノードの追加
function addNode(titlestr, datastr){
	var fixNode = document.createElement("div");
	fixNode.className = "block_playdata_01 clearfix";
	
	var tmpNode1 = document.createElement("div");
	tmpNode1.className = "block_playdata_01_title";
	tmpNode1.innerHTML = titlestr;
	
	var tmpNode2 = document.createElement("div");
	tmpNode2.className = "block_playdata_01_text";
	tmpNode2.innerHTML = datastr;
	
	fixNode.appendChild(tmpNode1);
	fixNode.appendChild(tmpNode2);
	innerNode.appendChild(fixNode);
}
