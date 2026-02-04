/*:
 * @target MV
 * @plugindesc セーブファイルにアイコンを表示します。
 *
 * @help
 * セーブデータにアイコンを8個まで表示します。
 * 
 * プラグインパラメータで各アイコンについて
 * インデックス・XY表示位置・制御スイッチを指定できます。
 * 
 * 利用規約:
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布できます。
 *
 * @param icon1
 * @text アイコン1設定
 * @type struct<icon>
 * @desc アイコン1に関する設定をまとめて入力します。
 *
 * @param icon2
 * @text アイコン2設定
 * @type struct<icon>
 * @desc アイコン2に関する設定をまとめて入力します。
 *
 * @param icon3
 * @text アイコン3設定
 * @type struct<icon>
 * @desc アイコン3に関する設定をまとめて入力します。
 *
 * @param icon4
 * @text アイコン4設定
 * @type struct<info4>
 * @desc アイコン4に関する設定をまとめて入力します。
 *
 * @param icon5
 * @text アイコン5設定
 * @type struct<icon>
 * @desc アイコン5に関する設定をまとめて入力します。
 *
 * @param icon6
 * @text アイコン6設定
 * @type struct<icon>
 * @desc アイコン6に関する設定をまとめて入力します。
 *
 * @param icon7
 * @text アイコン7設定
 * @type struct<icon>
 * @desc アイコン7に関する設定をまとめて入力します。
 *
 * @param icon8
 * @text アイコン8設定
 * @type struct<icon>
 * @desc アイコン8に関する設定をまとめて入力します。
 */

 /*~struct~icon:
 *
 * @param iconIndex
 * @text アイコンインデックス
 * @desc セーブ画面に表示するアイコンインデックを指定します。
 * @type number
 * @default 0
 * 
 * @param posX
 * @text 水平位置
 * @desc アイコンの水平位置を指定します。
 * @type number
 * @default 0
 * 
 * @param posY
 * @text 垂直位置
 * @desc アイコンの垂直位置を指定します。
 * @type number
 * @default 0
 * 
 * @param enableSW
 * @text アイコン表示スイッチ
 * @desc アイコン表示を有効にするスイッチを指定します。
 * @type switch
 */

(() => {
  "use strict";
	//=============================================================================
	// Plugin Parameters
	//=============================================================================
	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);

	const icon1 = parameters["icon1"];
	const icon2 = parameters["icon2"];
	const icon3 = parameters["icon3"];
	const icon4 = parameters["icon4"];
	const icon5 = parameters["icon5"];
	const icon6 = parameters["icon6"];
	const icon7 = parameters["icon7"];
	const icon8 = parameters["icon8"];

	const iconSet = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8]
		.map(icon => icon ? JSON.parse(icon) : null);

	iconSet.forEach(icon => {
		if (icon) {
			icon.iconIndex = Number(icon.iconIndex) || 0;
			icon.posX = Number(icon.posX) || 0;
			icon.posY = Number(icon.posY) || 0;
			icon.enableSW = Number(icon.enableSW) || 0;
		}
	});

	//=============================================================================
	// Window_SavefileList
	//=============================================================================
	const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
	Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
		_Window_SavefileList_drawContents.apply(this, arguments);
		if (!info.iconSwitches) return;
		iconSet.forEach((icon, index) => {
			if (icon && icon.iconIndex > 0 && info.iconSwitches[index]) {
				this.drawIcon(icon.iconIndex, rect.x + icon.posX, rect.y + icon.posY);
			}
		});
	};

	Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
		//
	};

	//=============================================================================
	// DataManager
	//=============================================================================
	const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function () {
		const info = _DataManager_makeSavefileInfo.call(this);
		info.iconSwitches = iconSet.map(icon => icon && icon.enableSW ? $gameSwitches.value(icon.enableSW) : false);
		return info;
	};

})();