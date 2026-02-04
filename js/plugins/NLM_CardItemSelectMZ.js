/*==========================================================================
 NLM_CardItemSelectMZ.js
----------------------------------------------------------------------------
 (C)2022 NoLimits
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.2.0 2023/02/20 戦闘時に共通レイヤー画像を変更できるように修正
 1.1.1 2023/02/19 複数回行動で常にアイテム表示が優先されてしまうのを修正
 1.1.0 2022/09/05「mz15fix.js」を取り込み（Ruたん様のご厚意により）
 1.0.0 2022/08/31 初版
============================================================================*/

/*:
 * @target MZ
 * @plugindesc カード風アイテム･スキル選択プラグイン
 * @author ノリミツ (NoLimits)
 * 
 * @param pluginOn
 * @desc このプラグインの適用範囲（デフォルト：1）
 * @type select
 * @default 1
 * @option 1：アイテムとスキル両方に適用
 * @value 1
 * @option 2：アイテムのみに適用
 * @value 2
 * @option 3：スキルのみに適用
 * @value 3
 * 
 * @param itemHeight
 * @desc アイテム項目の高さ（デフォルト：176、ツクールデフォ：44）
 * @type number
 * @default 176
 * 
 * @param itemCols
 * @desc アイテム項目の列数（デフォルト：6、ツクールデフォ：2）
 * @type number
 * @default 6
 * 
 * @param itemColSpacing
 * @desc アイテム項目の列間（デフォルト：3、ツクールデフォ：16）
 * @type number
 * @default 3
 * 
 * @param itemPicAutoScale
 * @desc アイテム項目の背景画の自動拡縮（デフォルト：2）　　　　　（アイテムのメモ欄 <CIPic:ファイル名>で画像指定）
 * @type select
 * @default 2
 * @option 1：原寸大（自動拡縮しない）
 * @value 1
 * @option 2：縦横比を維持して縦尺に合わせ自動拡縮
 * @value 2
 * @option 3：縦横比を維持して横尺に合わせ自動拡縮
 * @value 3
 * @option 4：縦横比を無視して最大に自動拡縮
 * @value 4
 * 
 * @param itemComLayer
 * @desc アイテム項目の共通レイヤー画（デフォルト：なし）　　　　　（メモ欄 <CIPic:（画像）>の前面に合成される画像）
 * @type file
 * @dir img/pictures
 * 
 * @param itemBattleLayer
 * @desc アイテム戦闘時の共通レイヤー画（デフォルト：なし）　　　　（戦闘時に上項目に代わって表示。なしだと上項目と同じに）
 * @type file
 * @dir img/pictures
 * 
 * @param itemLayerAutoScale
 * @desc アイテム項目のレイヤー画の自動拡縮（デフォルト：4）
 * @type select
 * @default 4
 * @option 1：原寸大（自動拡縮しない）
 * @value 1
 * @option 2：縦横比を維持して縦尺に合わせ自動拡縮
 * @value 2
 * @option 3：縦横比を維持して横尺に合わせ自動拡縮
 * @value 3
 * @option 4：縦横比を無視して最大に自動拡縮
 * @value 4
 * 
 * @param itemNameSize
 * @desc アイテム名のフォントサイズ（デフォルト：22、ツクールデフォ：26）
 * @type number
 * @default 22
 * 
 * @param itemNameColor
 * @desc アイテム名のフォントカラー（デフォルト：0、ツクールデフォ：0）
 * @type number
 * @default 0
 * @max 31
 * 
 * @param itemNameY
 * @desc アイテム名のーY座標（デフォルト：68、ツクールデフォ：0）（下方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 68
 * 
 * @param itemNumSize
 * @desc アイテム個数のフォントサイズ（デフォルト：26、ツクールデフォ：26）
 * @type number
 * @default 26
 * 
 * @param itemNumColor
 * @desc アイテム個数のフォントカラー（デフォルト：27、ツクールデフォ：0）
 * @type number
 * @default 27
 * @max 31
 * 
 * @param itemNumY
 * @desc アイテム個数の＋Y座標（デフォルト：68、ツクールデフォ：0）（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 68
 * 
 * @param itemExLineSize
 * @desc アイテム<EXL*:>のフォントサイズ（デフォルト：14）　（<EXL2:>以降で変更する際は文章内で\fs[]にて変更を）
 * @type number
 * @default 14
 * 
 * @param itemExLineColor
 * @desc アイテム<EXL*:>のフォントカラー（デフォルト：17）　（<EXL2:>以降で変更する際は文章内で\c[]にて変更を）
 * @type number
 * @default 17
 * @max 31
 * 
 * @param itemExLine1Y
 * @desc アイテム<EXL1:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param itemExLine2Y
 * @desc アイテム<EXL2:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param itemExLine3Y
 * @desc アイテム<EXL3:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param itemOpacity
 * @desc アイテム項目の使用不可時の暗転化（デフォルト：1、ツクールデフォ：1）（戦闘時は全て暗転化）
 * @type select
 * @default 1
 * @option 1：全て暗転化する
 * @value 1
 * @option 2：背景画のみ暗転化しない
 * @value 2
 * @option 3：全て暗転化しない
 * @value 3
 * 
 * @param itemBlackDelete
 * @desc アイテム項目背部の黒いスプライトを消す（デフォルト：OFF、ツクールデフォ：OFF）
 * @type boolean
 * @default false
 * 
 * @param skillHeight
 * @desc スキル項目の高さ（デフォルト：176、ツクールデフォ：44）
 * @type number
 * @default 176
 * 
 * @param skillCols
 * @desc スキル項目の列数（デフォルト：6、ツクールデフォ：2）
 * @type number
 * @default 6
 * 
 * @param skillColSpacing
 * @desc スキル項目の列間（デフォルト：3、ツクールデフォ：16）
 * @type number
 * @default 3
 * 
 * @param skillPicAutoScale
 * @desc スキル項目の背景画の自動拡縮（デフォルト：2）　　　　　（スキルのメモ欄 <CSPic:ファイル名>で画像指定）
 * @type select
 * @default 2
 * @option 1：原寸大（自動拡縮しない）
 * @value 1
 * @option 2：縦横比を維持して縦尺に合わせ自動拡縮
 * @value 2
 * @option 3：縦横比を維持して横尺に合わせ自動拡縮
 * @value 3
 * @option 4：縦横比を無視して最大に自動拡縮
 * @value 4
 * 
 * @param skillComLayer
 * @desc スキル項目の共通レイヤー画（デフォルト：なし）　　　　　（メモ欄 <CSPic:（画像）>の前面に合成される画像）
 * @type file
 * @dir img/pictures
 * 
 * @param skillLayerAutoScale
 * @desc スキル項目のレイヤー画の自動拡縮（デフォルト：4）
 * @type select
 * @default 4
 * @option 1：原寸大（自動拡縮しない）
 * @value 1
 * @option 2：縦横比を維持して縦尺に合わせ自動拡縮
 * @value 2
 * @option 3：縦横比を維持して横尺に合わせ自動拡縮
 * @value 3
 * @option 4：縦横比を無視して最大に自動拡縮
 * @value 4
 * 
 * @param skillNameSize
 * @desc スキル名のフォントサイズ（デフォルト：22、ツクールデフォ：26）
 * @type number
 * @default 22
 * 
 * @param skillNameColor
 * @desc スキル名のフォントカラー（デフォルト：0、ツクールデフォ：0）
 * @type number
 * @default 0
 * @max 31
 * 
 * @param skillNameY
 * @desc スキル名のーY座標（デフォルト：68、ツクールデフォ：0）　　（下方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 68
 * 
 * @param skillNumSize
 * @desc スキルコストのフォントサイズ（デフォルト：26、ツクールデフォ：26）
 * @type number
 * @default 26
 * 
 * @param skillNumY
 * @desc スキルコストの＋Y座標（デフォルト：68、ツクールデフォ：0）（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 68
 * 
 * @param skillExLineSize
 * @desc スキル<EXL*:>のフォントサイズ（デフォルト：14）　　　（<EXL2:>以降で変更する際は文章内で\fs[]にて変更を）
 * @type number
 * @default 14
 * 
 * @param skillExLineColor
 * @desc スキル<EXL*:>のフォントカラー（デフォルト：17）　　　（<EXL2:>以降で変更する際は文章内で\c[]にて変更を）
 * @type number
 * @default 17
 * @max 31
 * 
 * @param skillExLine1Y
 * @desc スキル<EXL1:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param skillExLine2Y
 * @desc スキル<EXL2:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param skillExLine3Y
 * @desc スキル<EXL3:>の＋Y座標（デフォルト：0）　　　　　　　　（上方にしたい場合は「テキスト」からマイナス値入力を）
 * @type number
 * @default 0
 * 
 * @param skillOpacity
 * @desc スキル項目の使用不可時の暗転化（デフォルト：1、ツクールデフォ：1）（戦闘時は全て暗転化）
 * @type select
 * @default 1
 * @option 1：全て暗転化する
 * @value 1
 * @option 2：背景画のみ暗転化しない
 * @value 2
 * @option 3：全て暗転化しない
 * @value 3
 * 
 * @param skillBlackDelete
 * @desc スキル項目背部の黒いスプライトを消す（デフォルト：OFF、ツクールデフォ：OFF）
 * @type boolean
 * @default false
 * 
 * @param itemShopPic
 * @desc 店で購入時にアイテム背景画を表示（サイズ固定試作中）　　　（デフォルト：OFF）
 * @type boolean
 * @default false
 * 
 * @param itemEquipPic
 * @desc 装備Slotのアイテム背景画を表示（サイズ固定試作中）　　　　（デフォルト：OFF）
 * @type boolean
 * @default false
 * 
 * @param battleCommandPriority
 * @desc 戦闘コマンドでの優先初回表示（サンプルプロジェクト用試作）　　（デフォルト：0）
 * @type select
 * @default 0
 * @option 0：優先表示なし（通常のアクターコマンドから）
 * @value 0
 * @option 1：アイテム選択を優先表示（最初から）
 * @value 1
 * @option 2：アイテム選択を優先表示（初回を除く）
 * @value 2
 * @option 3：スキル選択を優先表示（最初から）
 * @value 3
 * @option 4：スキル選択を優先表示（初回を除く）
 * @value 4
 * 
 * @param noSkillType
 * @desc サンプルプロジェクト専用：スキルタイプ選択を省略　　　　　（デフォルト：OFF）　(複数スキルタイプでは必ずOFFに）
 * @type boolean
 * @default false
 * 
 * @param ProperDesc
 * @desc サンプルプロジェクト専用：カード拡大イベントでの説明欄の適正表示、選択肢の記憶（デフォルト：OFF）
 * @type boolean
 * @default false
 * 
 * @param Core15fix
 * @desc コアスクリプト1.5でブラウザプレイ時に画像が読み込まれない不具合を修正（デフォルト：ON）
 * @type boolean
 * @default true
 * 
 * @noteParam CIPic
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @noteParam CILayer
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @noteParam BILayer
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @noteParam CSPic
 * @noteDir img/pictures/
 * @noteType file
 * @noteData skills
 * 
 * @noteParam CSLayer
 * @noteDir img/pictures/
 * @noteType file
 * @noteData skills
 * 
 * 
 * @help
 * 
 * 【RPGツクールMZ専用プラグイン】（NLM-001　Ver 1.2.0）
 * アイテムやスキルの選択項目の列数・高さを変更し、背景画を加えます。
 * これにより簡易的に「カード風」に見えるようになるプラグインです。
 * （このプラグインのみでカードゲームになる訳ではないので御注意ください）
 * 
 * 背景画にしたいPNG画像を「pictures」フォルダの中に入れてから、
 * 該当アイテムやスキルの「メモ欄」に
 * 
 * 　アイテムの場合　　<CIPic:ファイル名>
 * 　スキル　の場合　　<CSPic:ファイル名>　　　と書くだけで背景画が加わります。
 * 
 *　　　　　　例 　<CIPic:Evil_6>　　　<CSPic:Actor1_6>
 * 
 * 背景画は、自動スケーリング機能でサイズを自動調整されるので、
 * 画像サイズをあまり気にせず、設定できます。
 * 原寸大でCGを作る場合は、デフォルトで「124×168」ドットが丁度よい感じです。
 * 背景画の前面に重ねて表示される「共通レイヤー画」も設定できます。
 * 
 * 「メモ」欄に以下を記述することで、個別指定のアイテムやスキルも作れます。
 * 
 * 　<CILayer:ファイル名>　　　 アイテムでレイヤー画を個別指定。
 * 　<BILayer:ファイル名>　　　 アイテム戦闘時のみのレイヤー画を個別指定。
 * 　<CSLayer:ファイル名>　　　 スキルでレイヤー画を個別指定。
 * 　　　　　　　　　　　　　　 （上記いずれも共通レイヤー画は無視されます）
 * 
 * 　<NoLayerPic>　　　　　　　 レイヤー画像が表示されなくなります。
 * 
 * 　<NoNumberPic>　　　　　　　アイテムの場合、個数が表示されなくなります。
 * 
 * 　<EXL1:文章>　　　　　　　　背景画の上に文字を描画できます（3か所まで）
 * 　<EXL2:文章>　　　　　　　　（制御文字も使用できます）
 * 　<EXL3:文章>　　　　　　　　（X座標は指定できないので空白挿入でご調節を）
 * 
 *         例 　<EXL1:\c[17]デッキ計 \v[31] 枚>
 * 
 * （注意）
 * 　　画像サイズが大きい場合（特にブラウザプレイで）画像データの読み込みに失敗
 * 　 や遅延が発生することがある点は、ご了承ください。
 * 
 * （補足）
 * 　・ まっつUP様の「MAT_ArtifactItem.js」プラグインや、DarkPlasma様の
 * 　　「DarkPlasma_ConsumeItemImmediately.js」プラグインと、組み合わせる際は
 * 　　MZ上の「プラグイン管理」で、本プラグインを、これらより下に配置するように
 * 　　して下さい。
 * 　・ メモ欄に<CIPic:>等でファイル名の記載があれば、そのファイルは「未使用
 * 　　ファイル削除」の対象外になります。
 * 
 * プラグインコマンドはありません。
 * 利用規約はMITライセンスの通りです。CGの著作権は遵守して下さい。
 */

(() => {
    "use strict";

    const pluginName = "NLM_CardItemSelectMZ";
    const NLMCparam = PluginManager.parameters(pluginName);

    let NLMCshiftX = 0, NLMCshiftY = 0, NLMCwidth = 0, NLMCheight = 0, NLMCplusX = 0, NLMCplusY = 0;

    // 背景画の座標スケーリング計算
    function NLMCcoodiCalc(bitmap, itemWidth, itemHeight, n) { 
        let shiftX = 0, shiftY = 0, mshiftX = 0, mshiftY = 0, plusX = 0, plusY = 0;
        let width  = bitmap.width;
        let height = bitmap.height;
        let autoScale = Number(NLMCparam.itemPicAutoScale) || 1;
        if (n === 2) {autoScale = Number(NLMCparam.itemLayerAutoScale)  || 1;}
        if (n === 3) {autoScale = Number(NLMCparam.skillPicAutoScale)   || 1;}
        if (n === 4) {autoScale = Number(NLMCparam.skillLayerAutoScale) || 1;}
        if (autoScale === 1) {
            mshiftX = (bitmap.width - itemWidth) / 2;
            if (mshiftX > 0) {
                shiftX = mshiftX;
                width = itemWidth;
            } else {
                plusX = Math.abs(mshiftX) - 4;
            }
            mshiftY = (bitmap.height - itemHeight) / 2;
            if (mshiftY > 0) {
                shiftY = mshiftY;
                height = itemHeight;
            }
        }
        if (autoScale === 2) {
            const widthK = itemWidth / itemHeight * bitmap.height;
            mshiftX = (bitmap.width - widthK) / 2
            if (mshiftX > 0) {
                shiftX = mshiftX;
            } else {
                plusX = Math.abs(mshiftX) * itemHeight / bitmap.height;
            }
            width = widthK;
        }
        if (autoScale === 3) {
            const heightK = itemHeight / itemWidth * bitmap.width - 4;
            mshiftY = (bitmap.height - heightK) / 2;
            if (mshiftY > 0) {
                shiftY = mshiftY;
            } else {
                plusY = Math.abs(mshiftY) * itemWidth / bitmap.width;
            }
            height = heightK;
        }
        NLMCshiftX = shiftX;
        NLMCshiftY = shiftY;
        NLMCwidth  = width;
        NLMCheight = height;
        NLMCplusX  = plusX;
        NLMCplusY  = plusY;
    };

    if (Number(NLMCparam.pluginOn) !== 3) {
    // Window_ItemListのオーバーライド
        const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
        Window_ItemList.prototype.initialize = function() {
            _Window_ItemList_initialize.apply(this, arguments);
            if (NLMCparam.itemBlackDelete === "true") {
                this._contentsBackSprite.alpha = 0; // 背部黒スプライトを消す
            }
        };

        Window_ItemList.prototype.itemHeight = function() {
            return Number(NLMCparam.itemHeight) || 44; // アイテム項目の高さ変更
        };

        Window_ItemList.prototype.maxCols = function() {
            return Number(NLMCparam.itemCols) || 1; // アイテム項目の列数変更
        };

        Window_ItemList.prototype.colSpacing = function() {
            return Number(NLMCparam.itemColSpacing) || 0; // アイテム項目の列間距離変更
        };

        const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
        Window_ItemList.prototype.drawItem = function(index) {
            this.NLMCdrawItem(index);
        };

        Window_ItemList.prototype.NLMCdrawItem = function(index) {
            const item = this.itemAt(index);
            if (item) {
                const rect = this.itemLineRect(index);
                const nameY = rect.y - Number(NLMCparam.itemNameY)  || 0;
                const numberY = rect.y + Number(NLMCparam.itemNumY) || 0;
                const itemOpacity = Number(NLMCparam.itemOpacity  ) || 1;
                let file1 = item.meta["CIPic"];
                let file2 = NLMCparam.itemComLayer;
                let CPic2 = item.meta["CILayer"];
                if ($gameParty.inBattle() && !this._messageWindow) { // Ver 1.2で追加
                    let BPic2 = NLMCparam.itemBattleLayer;
                    let CPic3 = item.meta["BILayer"];
                    if (BPic2) {file2 = BPic2;}
                    if (CPic3) {CPic2 = CPic3;}
                }
                if (CPic2) {file2 = CPic2;}
                if (item.meta["NoLayerPic"]) {file2 = false;}
                const bitmap1 = ImageManager.loadPicture(file1);
                bitmap1.addLoadListener(function() {
                    const bitmap2 = ImageManager.loadPicture(file2);
                    bitmap2.addLoadListener(function() {
                        if ($gameParty.inBattle() || (itemOpacity === 1)) {
                            this.changePaintOpacity(this.isEnabled(item));
                        }
                        this.NLMCdrawBitmap(bitmap1, rect, 1); // アイテム背景画の描画
                        this.NLMCdrawBitmap(bitmap2, rect, 2); // アイテムレイヤー画の描画
                        if (itemOpacity === 2) {
                            this.changePaintOpacity(this.isEnabled(item));
                        }
                        this.contents.fontSize = Number(NLMCparam.itemNameSize) || 26;  // アイテム名のフォントサイズ変更
                        this.NLMCdrawItemName(item, rect.x - 5, nameY, rect.width + 5); // アイテム名の描画（個数の幅は無視）
                        this.NLMCdrawExLines(item, rect);                               // アイテムExLineの描出
                        this.contents.fontSize = Number(NLMCparam.itemNumSize) || 26;   // アイテム個数のフォントサイズ変更
                        this.NLMCdrawItemNumber(item, rect.x, numberY, rect.width);     // アイテム個数の描画
                    }.bind(this));
                }.bind(this));
                this.changePaintOpacity(1);
                this._clientArea.addChild(this._cursorSprite); // カーソル再描画
            }
        };

        Window_ItemList.prototype.NLMCdrawBitmap = function(bitmap, rect, n){
            const itemWidth  = this.itemWidth()  - 4 - this.colSpacing();
            const itemHeight = this.itemHeight() - 8;
            NLMCcoodiCalc(bitmap, itemWidth, itemHeight, n);
            const x = rect.x - 5 + NLMCplusX;
            const y = rect.y - itemHeight / 2 + 17 + NLMCplusY;
            this.contents.blt(bitmap, NLMCshiftX, NLMCshiftY, NLMCwidth, NLMCheight, x, y, itemWidth, itemHeight);
        };

        Window_ItemList.prototype.NLMCdrawItemName = function(item, x, y, width) {
            if (item) {
                const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                let textMargin = 5;
                if (item.iconIndex) { // アイコンが0番の時は左詰め
                    textMargin = ImageManager.iconWidth + 4;
                }
                const itemWidth = Math.max(0, width - textMargin);
                this.changeTextColor(ColorManager.textColor(Number(NLMCparam.itemNameColor) || 0)); // アイテム名のフォントカラー変更
                this.drawIcon(item.iconIndex, x, iconY);
                this.drawText(item.name, x + textMargin, y, itemWidth);
            }
        };

        Window_ItemList.prototype.NLMCdrawExLines = function(item, rect) {
            let EXLn = "", exLineDesc = "", exLineY = 0;
            for (let i = 1; i < 4 ; i++) {
                EXLn = "EXL"+ i;
                if (item.meta[EXLn]) {
                    exLineDesc = String(item.meta[EXLn]);
                    switch (i) {
                        case 1:
                            exLineY = Number(NLMCparam.itemExLine1Y) || 0;
                            break;
                        case 2: 
                            exLineY = Number(NLMCparam.itemExLine2Y) || 0;
                            break;
                        case 3:
                            exLineY = Number(NLMCparam.itemExLine3Y) || 0;
                            break;
                    }
                    this.NLMCdrawTextEx(exLineDesc, rect.x, rect.y + exLineY, rect.width);
                }
            }
        };

        Window_ItemList.prototype.NLMCdrawTextEx = function(text, x, y, width) {
            this.contents.fontSize = Number(NLMCparam.itemExLineSize) || 14;
            this.changeTextColor(ColorManager.textColor(Number(NLMCparam.itemExLineColor) || 0));
            const textState = this.createTextState(text, x, y, width);
            this.processAllText(textState);
            return textState.outputWidth;
        };

        Window_ItemList.prototype.NLMCdrawItemNumber = function(item, x, y, width) {
            this.drawItemCost(item, x-5, y, width); // MAT_artifactItem.js（作：まっつUP様）との組み合わせ
            if (this.needsNumber() && !item.meta["NoNumberPic"]) { // <NoNumberPic>があると個数を描出しない
                // ":"の描出は削除して、アイテム個数のフォントカラー変更
                this.changeTextColor(ColorManager.textColor(Number(NLMCparam.itemNumColor) || 0));
                this.drawText($gameParty.numItemsForDisplay(item), x, y, width, "right");
                // DarkPlasma_ConsumeItemImmediately.js（作：DarkPlasma様）との組み合わせ
            }
        };

        // MAT_artifactItem.js（作：まっつUP様）との競合対策
            Window_ItemList.prototype.usecostactor = function() {
                return this._actor;
            };

            Window_ItemList.prototype.drawItemCost = function(item, x, y, width) {
                const actor = this.usecostactor();
                if(!actor) return;
                const mpcost = Number(item.meta["ItMPpay"]); //
                const tpcost = Number(item.meta["ItTPpay"]); // 常に値を表示
                const drawcost = (mpcost || tpcost || 0);
                if(mpcost > 0){
                    this.changeTextColor(ColorManager.mpCostColor());
                }else if(tpcost > 0){
                    this.changeTextColor(ColorManager.tpCostColor());
                }
                if(drawcost > 0){
                    this.drawText(String(drawcost), x, y, width); // "right"を削除
                }
                this.resetTextColor();
            };

        // DarkPlasma_ConsumeItemImmediately.js（作：DarkPlasma様）との競合対策
            Game_Party.prototype.numItemsForDisplay = function (item) {
                return this.inBattle() && BattleManager.isInputting()
                ? this.numItems(item) - BattleManager.reservedItemCount(item)
                : this.numItems(item);
            };

            BattleManager.reservedItemCount = function (item) {
                return this._reservedItems.filter((reservedItem) => reservedItem.id === item.id).length;
            };

            const _BattleManager_initMembers = BattleManager.initMembers;
                BattleManager.initMembers = function () {
                _BattleManager_initMembers.call(this);
                this._reservedItems = [];
            };

        // イベントアイテム選択の表示変更
        Scene_Message.prototype.eventItemWindowRect = function() {
            const wx = 0;
            const wy = 0;
            const ww = Graphics.boxWidth;
            const wh = this.calcWindowHeight(8, true); // 4行から8行に変更
            return new Rectangle(wx, wy, ww, wh);
        };

　　　　Window_EventItem.prototype.needsNumber = function() {
  　　　　  const itypeId = $gameMessage.itemChoiceItypeId();
  　　　　  if (itypeId === 2) {
    　　　　    // Key Item
   　　　　     return $dataSystem.optKeyItemsNumber;
    　　　　} else if (itypeId >= 3) {
      　　　　  // Hidden Item
      　　　　  return $dataSystem.optKeyItemsNumber; // falseから変更（隠しアイテムも個数を表示可）
    　　　　} else {
       　　　　 // Normal Item
      　　　　  return true;
  　　　　  }
　　　　};

        // 装備画面のアイテム欄の幅調整
        Window_EquipItem.prototype.maxCols = function() {
            return Math.ceil(Number(NLMCparam.itemCols) / 2) || 1;
        };

        Window_EquipItem.prototype.colSpacing = function() {
            return Number(NLMCparam.itemColSpacing) || 0;
        };

        Scene_Equip.prototype.statusWidth = function() {
            const cols = Number(NLMCparam.itemCols) || 1;
            return Graphics.width / cols * Math.floor(cols / 2) -16;
        };
    }

    if (Number(NLMCparam.pluginOn) !== 2) {
    // Window_SkillListのオーバーライド
        const _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
        Window_SkillList.prototype.initialize = function() {
            _Window_SkillList_initialize.apply(this, arguments);
            if (NLMCparam.skillBlackDelete === "true") {
                this._contentsBackSprite.alpha = 0; // 背部黒スプライトを消す
            }
        };

        Window_SkillList.prototype.itemHeight = function() {
            return Number(NLMCparam.skillHeight) || 44; // スキル項目の高さ変更
        };

        Window_SkillList.prototype.maxCols = function() {
            return Number(NLMCparam.skillCols) || 1; // スキル項目の列数変更
        };

        Window_SkillList.prototype.colSpacing = function() {
            return Number(NLMCparam.skillColSpacing) || 0; // スキル項目の列間距離変更
        };

        const _Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
        Window_SkillList.prototype.drawItem = function(index) {
            this.NLMCdrawItem(index);
        };

        Window_SkillList.prototype.NLMCdrawItem = function(index) {
            const skill = this.itemAt(index);
            if (skill) {
                const rect = this.itemLineRect(index);
                const nameY = rect.y - Number(NLMCparam.skillNameY)  || 0;
                const numberY = rect.y + Number(NLMCparam.skillNumY) || 0;
                const skillOpacity = Number(NLMCparam.skillOpacity)  || 1;
                let file1 = skill.meta["CSPic"];
                let file2 = NLMCparam.skillComLayer;
                const CPic2 = skill.meta["CSLayer"];
                if (CPic2) {file2 = CPic2;}
                if (skill.meta["NoLayerPic"]) {file2 = false;}
                const bitmap1 = ImageManager.loadPicture(file1);
                bitmap1.addLoadListener(function() {
                    const bitmap2 = ImageManager.loadPicture(file2);
                    bitmap2.addLoadListener(function() {
                        if ($gameParty.inBattle() || (skillOpacity === 1)) {
                            this.changePaintOpacity(this.isEnabled(skill));
                        }
                        this.NLMCdrawBitmap(bitmap1, rect, 3); // スキル背景画の描画
                        this.NLMCdrawBitmap(bitmap2, rect, 4); // スキルレイヤー画の描画
                        if (skillOpacity === 2) {
                            this.changePaintOpacity(this.isEnabled(skill));
                        }
                        this.contents.fontSize = Number(NLMCparam.skillNameSize) || 26;  // スキル名のフォントサイズ変更
                        this.NLMCdrawItemName(skill, rect.x - 5, nameY, rect.width + 5); // スキル名の描画（MP値の幅は無視）
                        this.NLMCdrawExLines(skill, rect);                               // スキルExLineの描出
                        this.contents.fontSize = Number(NLMCparam.skillNumSize) || 26;   // スキルコストのフォントサイズ変更
                        this.drawSkillCost(skill, rect.x, numberY, rect.width);
                    }.bind(this));
                }.bind(this));
                this.changePaintOpacity(1);
                this._clientArea.addChild(this._cursorSprite); // カーソル再描画
            }
        };

        Window_SkillList.prototype.NLMCdrawBitmap = function(bitmap, rect, n){
            const itemWidth  = this.itemWidth()  - 4 - this.colSpacing();
            const itemHeight = this.itemHeight() - 8;
            NLMCcoodiCalc(bitmap, itemWidth, itemHeight, n);
            const x = rect.x - 5 + NLMCplusX;
            const y = rect.y - itemHeight / 2 + 17 + NLMCplusY;
            this.contents.blt(bitmap, NLMCshiftX, NLMCshiftY, NLMCwidth, NLMCheight, x, y, itemWidth, itemHeight);
        };

        Window_SkillList.prototype.NLMCdrawItemName = function(item, x, y, width) {
            if (item) {
                const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                const textMargin = ImageManager.iconWidth + 4;
                const itemWidth = Math.max(0, width - textMargin);
                this.changeTextColor(ColorManager.textColor(Number(NLMCparam.skillNameColor) || 0)); // スキル名のフォントカラー変更
                this.drawIcon(item.iconIndex, x, iconY);
                this.drawText(item.name, x + textMargin, y, itemWidth);
            }
        };

        Window_SkillList.prototype.NLMCdrawExLines = function(item, rect) {
            let EXLn = "", exLineDesc = "", exLineY = 0;
            for (let i = 1; i < 4 ; i++) {
                EXLn = "EXL"+ i;
                if (item.meta[EXLn]) {
                    exLineDesc = String(item.meta[EXLn]);
                    switch (i) {
                        case 1:
                            exLineY = Number(NLMCparam.skillExLine1Y) || 0;
                            break;
                        case 2: 
                            exLineY = Number(NLMCparam.skillExLine2Y) || 0;
                            break;
                        case 3:
                            exLineY = Number(NLMCparam.skillExLine3Y) || 0;
                            break;
                    }
                    this.NLMCdrawTextEx(exLineDesc, rect.x, rect.y + exLineY, rect.width);
                }
            }
        };

        Window_SkillList.prototype.NLMCdrawTextEx = function(text, x, y, width) {
            this.contents.fontSize = Number(NLMCparam.skillExLineSize) || 14;
            this.changeTextColor(ColorManager.textColor(Number(NLMCparam.skillExLineColor) || 0));
            const textState = this.createTextState(text, x, y, width);
            this.processAllText(textState);
            return textState.outputWidth;
        };
    }

    // 店で購入時にアイテム背景画を描画（試作サイズ固定）
    if (NLMCparam.itemShopPic === "true") {
        const _Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
        Window_ShopBuy.prototype.updateHelp = function() {
            _Window_ShopBuy_updateHelp.apply(this, arguments);
            if (DataManager.isItem(this.item())) {
                const file = this.item().meta["CIPic"];
                const bitmap = ImageManager.loadPicture(file);
                bitmap.addLoadListener(function() {
                    let x = 75; // 背景画のWindow内のX座標
                    let y = 80; // 背景画のWindow内のY座標
                    const itemWidth  = 124 * 1.5; // 描画サイズ（幅）
                    const itemHeight = 168 * 1.5; // 描画サイズ（高さ）
                    NLMCcoodiCalc(bitmap, itemWidth, itemHeight, 1);
                    x += NLMCplusX;
                    y += NLMCplusY;
                    this._statusWindow.contents.blt(bitmap, NLMCshiftX, NLMCshiftY, NLMCwidth, NLMCheight, x, y, itemWidth, itemHeight);
                }.bind(this));
            }
        };
    }

    // 装備Slotのアイテム背景画を描画（試作サイズ固定）
    if (NLMCparam.itemEquipPic === "true") {
        Window_ItemList.prototype.NLMCupdateHelp = function() {
            if (this.item()) {
                const file = this.item().meta["CIPic"];
                const bitmap = ImageManager.loadPicture(file);
                bitmap.addLoadListener(function() {
                    let x = 205; // 背景画のWindow内のX座標
                    let y =  40; // 背景画のWindow内のY座標
                    const itemWidth  = 124 * 0.8; // 描画サイズ（幅）
                    const itemHeight = 168 * 0.8; // 描画サイズ（高さ）
                    NLMCcoodiCalc(bitmap, itemWidth, itemHeight, 1);
                    x += NLMCplusX;
                    y += NLMCplusY;
                    this._statusWindow.contents.blt(bitmap, NLMCshiftX, NLMCshiftY, NLMCwidth, NLMCheight, x, y, itemWidth, itemHeight);
                }.bind(this));
            } else {
                this._statusWindow.refresh();
            }
        };

        const _Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp;
        Window_EquipSlot.prototype.updateHelp = function() {
            _Window_EquipSlot_updateHelp.apply(this, arguments);
            Window_ItemList.prototype.NLMCupdateHelp.call(this);
        };

        const _Window_EquipItem_updateHelp = Window_EquipItem.prototype.updateHelp;
        Window_EquipItem.prototype.updateHelp = function() {
            _Window_EquipItem_updateHelp.apply(this, arguments);
            Window_ItemList.prototype.NLMCupdateHelp.call(this);
        };

        Scene_Equip.prototype.onItemOk = function() { // statusWindowをrefreshしない
            SoundManager.playEquip();
            this.executeEquipChange();
            this.hideItemWindow();
            this._slotWindow.refresh();
            this._itemWindow.refresh();
        };

        const _Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel
        Scene_Equip.prototype.onSlotCancel = function() {
            _Scene_Equip_onSlotCancel.apply(this, arguments);
            this._statusWindow.refresh();
        };
    }

    // 戦闘コマンドでの優先初回表示（試作）
    const NLMCbattleCommandPriority = Number(NLMCparam.battleCommandPriority) || 0;
    let NLMCfirstCommand = true;
    if ((NLMCbattleCommandPriority % 2) === 0) { // 2か4の場合
        NLMCfirstCommand = false;
        const _BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
        BattleManager.updateTurnEnd = function() {
            _BattleManager_updateTurnEnd.call(this);
            NLMCfirstCommand = false; // 初回を除く場合は、毎ターン初期化
        };
    }
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    if (NLMCbattleCommandPriority && (NLMCbattleCommandPriority <= 2)) {
        Scene_Battle.prototype.startActorCommandSelection = function() {
            let canUse = false;
            for (let i = 1; i < $dataItems.length; i++) {
                const d = $dataItems[i];
                if ((d.itypeId === 1) && $gameParty.numItems(d) && $gameParty.canUse(d)) {
                    canUse = true;
                    break;
                }
            }
            if (canUse && NLMCfirstCommand) { // 使えるアイテムがあればアイテム選択から開始
                this._itemWindow.refresh();
                this._itemWindow.show();
                this._itemWindow.activate();
                this._statusWindow.hide();
                this._actorCommandWindow.hide();
                this._actorCommandWindow.setup(BattleManager.actor());
            } else {
                _Scene_Battle_startActorCommandSelection.call(this);
            }
            NLMCfirstCommand = true;
        };
        const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
        Scene_Battle.prototype.selectPreviousCommand = function () {
            _Scene_Battle_selectPreviousCommand.call(this);
            this.changeInputWindow(); // 戻る時にアイテムをリフレッシュ（DarkPlasma_ConsumeItemImmediately.js（作：DarkPlasma様）との組み合わせ）
        };
    }

    if (NLMCbattleCommandPriority >= 3) {
        Scene_Battle.prototype.startActorCommandSelection = function() {
            let canUse = false, fsTypeId = 0;
            const actor = BattleManager.actor();
            for (const stId of actor.skillTypes()) {
                for (let i = 1; i < $dataSkills.length; i++) {
                    const d = $dataSkills[i];
                    if ((d.stypeId === stId) && actor.canUse(d) && (!fsTypeId || (fsTypeId > stId))) {
                        canUse = true;
                        fsTypeId = stId;
                    }
                }
            }
            if (canUse && NLMCfirstCommand) { // 使えるスキルがあればスキル選択から開始
                this._skillWindow.setActor(actor);
                this._skillWindow.setStypeId(fsTypeId);
                this._skillWindow.refresh();
                this._skillWindow.show();
                this._skillWindow.activate();
                this._statusWindow.hide();
                this._actorCommandWindow.hide();
                this._actorCommandWindow.setup(actor);
            } else {
                _Scene_Battle_startActorCommandSelection.call(this);
            }
            NLMCfirstCommand = true;
        };
    }

    // サンプルプロジェクト用（スキルタイプ選択を省略）
    if (NLMCparam.noSkillType === "true") {
        // スキルタイプ選択を省略（アクター変更操作は不完全）
        const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
        Scene_Menu.prototype.commandPersonal = function() {
            if ($gameParty.size() === 1) {
                this.onPersonalOk(); // 一人ならアクター選択も省略
            } else {
                _Scene_Menu_commandPersonal.call(this);
            }
        };

        const _Scene_Skill_start = Scene_Skill.prototype.start;
        Scene_Skill.prototype.start = function() {
            _Scene_Skill_start.apply(this, arguments);
            this._skillTypeWindow.deactivate();
            this.commandSkill();
        };

        Scene_Skill.prototype.onItemCancel = function() {
            this.popScene();
        };
    }

    // サンプルプロジェクト用（カード拡大イベント時の説明欄の適正表示、選択肢の記憶）
    if (NLMCparam.ProperDesc === "true") {
        // アイテム説明文を代入した変数内の制御文字を正しく表示させる
        const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
        Window_Base.prototype.convertEscapeCharacters = function(text) {
            text = text.replace(/\\/g, "\x1b");
            text = text.replace(/\x1b\x1b/g, "\\");
            text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
                $gameVariables.value(parseInt(p1))
            );
            return _Window_Base_convertEscapeCharacters.call(this, text);
        };

        // 文章の表示で改行後も瞬間表示を継続
        Window_Message.prototype.processNewLine = function(textState) {
            Window_Base.prototype.processNewLine.call(this, textState);
            if (this.needsNewPage(textState)) {
                this.startPause();
            }
        };

        //選択肢の前選択を記憶
        let NLMClastChoice = 0;
        Window_ChoiceList.prototype.selectDefault = function() {
            this.select(NLMClastChoice);
        };

        Window_ChoiceList.prototype.callOkHandler = function() {
            $gameMessage.onChoice(this.index());
            this._messageWindow.terminateMessage();
            this.close();
            NLMClastChoice = this.index();
        };
    }

    // コアスクリプト 1.5.0 で画像がブラウザキャッシュに載っている場合に描画に失敗する問題の回避
    // Ruたん様のご厚意により「mz15fix.js」を取り込み
    if (NLMCparam.Core15fix === "true") {
        Bitmap.prototype._startLoading = function () {
            this._image = new Image();
            this._image.onload = this._onLoad.bind(this);
            this._image.onerror = this._onError.bind(this);
            this._destroyCanvas();
            this._loadingState = "loading";
            if (Utils.hasEncryptedImages()) {
                this._startDecrypting();
            } else {
                this._image.src = this._url;
            // 以下を削除（ここを Ver.1.4 に戻す）
            }
        };
    }
})();
