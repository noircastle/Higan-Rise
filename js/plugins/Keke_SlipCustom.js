//=============================================================================
// Keke_SlipCustom - スリップカスタム
// バージョン: 1.0.4
//=============================================================================
// Copyright (c) 2023 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc　スリップの効きのよさや演出を設定
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.4】
 * スリップダメージ/自動回復の効きのよさや固定値、演出を設定できる
 * 
 * ● 使い方 ●
 * 
 * 【機能1】キャラクターごとにスリップダメージの効きのよさを設定
 * 
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 * 
 * <HPスリップ率: (スリップダメージ率), (自動回復率)>
 * <MPスリップ率: (スリップダメージ率), (自動回復倍率)>
 * <TPスリップ率: (スリップダメージ率), (自動回復倍率)>
 * 
 * 例)
 * <HPスリップ率: 25, 50>
 * 　スリップダメージが 25%、自動回復が 50%
 * <HPスリップ率: 25>
 * 　スリップダメージが 25%、自動回復は変更なし
 * <HPスリップ率: , 50>
 * 　スリップダメージは変更なし、自動回復が 50%
 * 
 * 
 * 【機能2】スリップダメージを固定値で設定
 * 
 * ステートのメモ欄に
 * 
 * <HPスリップ値: (スリップ固定値)>
 * <MPスリップ値: (スリップ固定値)>
 * <TPスリップ値: (スリップ固定値)>
 * 
 * 例)
 * <HPスリップ値: 100>
 * 　100 のスリップダメージ
 * <HPスリップ値: -100>
 * 　100 の自動回復
 * 
 * ※固定値はプラスでダメージ、マイナスで回復する
 * 
 * 
 * 【機能3】スリップダメージの演出を設定
 * 
 * ★[手順1] プラグインパラメータで演出を登録
 * プラグインパラメータ → スリップ演出登録
 * ◎好きな演出名を付けて、演出内容を設定していく
 * 
 * ★[手順2] ステートのメモ欄から演出を呼び出す
 * ステートのメモ欄に
 * 
 * <スリップ演出: (演出名)>
 * 
 * 例)
 * <スリップ演出: 強い毒>
 * 　演出名が「強い毒」の演出を実行
 * 
 * 
 *
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * Set the effectiveness of the regen effect (slip damage/automatic recovery)
 * Separate settings for slip damage and auto recovery
 *
 * ● How to use ●
 *
 * [Function 1] Set the effect of slip damage for each character
 * 
 * Actor, Class, Skill, Item, Equipment, Enemy Character, State
 *
 * <hpRegeneRate: (Slip Damage Rate), (Auto Recovery Rate)>
 * <mpRegeneRate: (slip damage rate), (auto recovery rate)>
 * <tpRegeneRate: (Slip Damage Rate), (Auto Recovery Rate)>
 *
 * example)
 * <hpRegeneRate: 25, 50>
 * 25% slip damage, 50% auto recovery
 * <mpRegeneRate: 25>
 * 　25% slip damage, no change in automatic recovery
 * <tpRegeneRate: , 50>
 * No change in slip damage, 50% auto recovery
 * 
 * 
 * [Function 2] Set slip damage with a fixed value
 *
 * in the memo field of the state
 *
 * <hpSlipVal: (fixed slip value)>
 * <mpSlipVal: (fixed slip value)>
 * <tpSlipVal: (fixed slip value)>
 *
 * example)
 * <hpSlipVal: 100>
 * 100 slip damage
 * <mpSlipVal: -100>
 * 100 auto-recovery
 *
 * ※ The fixed value is plus for damage, and minus for recovery.
 *
 *
 * [Function 3] Set the effect of slip damage
 *
 * [Procedure 1] Register effects with plug-in parameters
 * Plug-in parameter → Slip effect registration
 * ◎ Add a name of your choice and set the content of the production
 *
 * [Step 2] Call the effect from the memo field of the state
 * in the memo field of the state
 *
 * <slipEffect: (Name of effect)>
 *
 * example)
 * <Slip effect: strong poison>
 * Execution of a production with the production name "strong poison"
 *
 *
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 * 
 * 
 * 
 * @param スリップ演出登録
 * @desc スリップの演出を登録する。ステートのメモ欄から呼び出せる
 * @type struct<effect>[]
 * @default ["{\"演出名\":\"毒\",\"優先度\":\"10\",\"演出\":\"\",\"アニメーション\":\"59\",\"ディレイ\":\"20\",\"効果音\":\"[\\\"{\\\\\\\"ファイル\\\\\\\":\\\\\\\"Slash8\\\\\\\",\\\\\\\"音量\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"ピッチ\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"位相\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"画面フラッシュ\":\"false\",\"…フラッシュ色\":\"255, 0, 0, 170\",\"…フラッシュ時間\":\"20\",\"フリーアニメ\":\"\"}","{\"演出名\":\"強い毒\",\"優先度\":\"10\",\"演出\":\"\",\"アニメーション\":\"59\",\"ディレイ\":\"20\",\"効果音\":\"[\\\"{\\\\\\\"ファイル\\\\\\\":\\\\\\\"Slash8\\\\\\\",\\\\\\\"音量\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"ピッチ\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"位相\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"画面フラッシュ\":\"true\",\"…フラッシュ色\":\"255, 0, 0, 170\",\"…フラッシュ時間\":\"20\",\"フリーアニメ\":\"\"}","{\"演出名\":\"弱い毒\",\"優先度\":\"10\",\"演出\":\"\",\"アニメーション\":\"59\",\"ディレイ\":\"20\",\"効果音\":\"[\\\"{\\\\\\\"ファイル\\\\\\\":\\\\\\\"Slash7\\\\\\\",\\\\\\\"音量\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"ピッチ\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"位相\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"画面フラッシュ\":\"false\",\"…フラッシュ色\":\"255, 0, 0, 170\",\"…フラッシュ時間\":\"20\",\"フリーアニメ\":\"\"}","{\"演出名\":\"炎上\",\"優先度\":\"10\",\"演出\":\"\",\"アニメーション\":\"66\",\"ディレイ\":\"20\",\"効果音\":\"[\\\"{\\\\\\\"ファイル\\\\\\\":\\\\\\\"Fire7\\\\\\\",\\\\\\\"音量\\\\\\\":\\\\\\\"150\\\\\\\",\\\\\\\"ピッチ\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"位相\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"画面フラッシュ\":\"true\",\"…フラッシュ色\":\"255, 0, 0, 170\",\"…フラッシュ時間\":\"30\",\"フリーアニメ\":\"\"}"]
 */


//================================================== 
/*~struct~effect:
//==================================================
 * @param 演出名
 * @desc 演出の名前。ステートのメモ欄からの呼び出しに使う
 * 
 * @param 優先度
 * @desc エフェクトの優先度。複数のエフェクトがある場合、値が高いものが優先して実行される
 * @default 10
 * 
 * @param 演出
 * 
 * @param アニメーション
 * @parent 演出
 * @desc 表示するアニメーション
 * @type animation
 * 
 * @param ディレイ
 * @parent 演出
 * @desc 効果音とフラッシュのディレイ。5なら 5フレーム 待ってから実行される
 * @default 20
 * 
 * @param 効果音
 * @parent 演出
 * @desc 鳴らす効果音
 * @type struct<se>[]
 * @default []
 * 
 * @param 画面フラッシュ
 * @parent 演出
 * @desc 画面フラッシュを実行する
 * @type boolean
 * @default false
 * 
 * @param …フラッシュ色
 * @parent 演出
 * @desc 画面フラッシュの色。赤, 緑, 青, 強さ。各0～255
 * @default 255, 255, 255, 170
 * 
 * @param …フラッシュ時間
 * @parent 演出
 * @desc フラッシュの所要時間。5 なら 5フレーム
 * @default 20
 * 
 * @param フリーアニメ
 * @parent 演出
 * @desc フリーアニメを再生する。メモ欄同様に記述。プラグイン『Keke_FreeAnime』が必要
 * @type multiline_string
 */



//==================================================
/*~struct~se:
//==================================================
 * @param ファイル
 * @desc 効果音ファイル
 * @type file
 * @dir audio/se
 *
 * @param 音量
 * @desc 効果音の音量
 * @default 100
 *
 * @param ピッチ
 * @desc 効果音のピッチ
 * @default 100
 *
 * @param 位相
 * @desc 効果音の位相
 * @default 0
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];



    //==================================================
    //--  文字列オート変換 /ベーシック
    //==================================================
    
    //- 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };
    
    
    //- 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        });
    };
    
    
    //- 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                if (key.match(/(カラー|色|塗り)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") &&  !key.includes("フラッシュ") && !key.includes("チェンジ") &&  !key.includes("選択")) {
                    val2 = "rgba(" +  match[1] + ")";
                } else {
                    val2 = JSON.parse("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[^\d\.\-,\s]/)) {
                val2 = JSON.parse("[" + match.reduce((r, s) => r + s).replace(/,$/, "") + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 = match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[a-z]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };



    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    let parameters = PluginManager.parameters(pluginName);
    
    const keke_slipEffects = strToList(parameters["スリップ演出登録"]);

    parameter = null;



    //==================================================
    //--  スリップ率
    //==================================================
    
    //- スリップ率をメモ欄から取得してて適用(コア追加)
    const _Game_BattlerBase_traitsSum =  Game_BattlerBase.prototype.traitsSum;
    Game_BattlerBase.prototype.traitsSum = function(code, id) {
        if (code == Game_BattlerBase.TRAIT_XPARAM && (id == 7 || id == 8 || id == 9)) {
            // スリップ率の適用
            return applySlipRate(this, code, id);
        }
        return _Game_BattlerBase_traitsSum.apply(this, arguments);
    };


    //- スリップ率の適用
    function applySlipRate(battler, code, id) {
        const word = id == 7 ? "HP" : id == 8 ? "MP" : "TP";
        const wordE = id == 7 ? "hp" : id == 8 ? "mp" : "tp";
        // スリップ率の取得
        const slipRate = getSlipRate(battler, word, wordE);
        // マイナスのスリップ量
        const minusSum = battler.traitsWithId(code, id).reduce((r, trait) => trait.value < 0 ? r + trait.value : r, 0);
        const minusLast = minusSum ? minusSum * slipRate.minus : 0;
        // プラスのスリップ量
        const plusSum = battler.traitsWithId(code, id).reduce((r, trait) => trait.value > 0 ? r + trait.value : r, 0);
        const plusLast = plusSum ? plusSum * slipRate.plus : 0;
        return minusLast + plusLast;
    };


    //- スリップ率の取得
    function getSlipRate(battler, word, wordE) {
        let minusRate = 1;
        let plusRate = 1;
        const metas = totalAllMetaArray(battler, [word + "スリップ率", wordE + "SlipRate"]);
        metas.forEach(meta => {
            const params = meta.split(",");
            if (params[0]) { minusRate *= Number(params[0]) / 100; }
            if (params[1]) { plusRate *= Number(params[1]) / 100; }
        });
        return { minus:minusRate, plus:plusRate };
    };



    //==================================================
    //--   スリップ固定値
    //==================================================

    //- HPスリップ固定値(コア追加)
    const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
    Game_Battler.prototype.regenerateHp = function() {
        _Game_Battler_regenerateHp.apply(this);
        // 元のダメージ
        const oriDamage = this._result.hpDamage || 0;
        // スリップ固定値の取得
        let fixVal = getSlipFixVal(this, "HP", "hp") || 0;
        if (fixVal) {
            // スリップ率の取得
            const slipRate = getSlipRate(this, "HP", "hp");
            // 固定値にスリップ率を適用
            fixVal = Math.floor(fixVal * (fixVal < 0 ? slipRate.minus : slipRate.plus));
            const minRecover = -this.maxSlipDamage();
            const value = Math.max(fixVal, minRecover);
            // HPに反映
            if (value != 0) {
                this.gainHp(value);
                // 元のダメージをリザルトに再追加
                this._result.hpDamage += oriDamage;
            }
        }
    };


    //- MPスリップ固定値(コア追加)
    const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
    Game_Battler.prototype.regenerateMp = function() {
        _Game_Battler_regenerateMp.apply(this);
        // 元のダメージ
        const oriDamage = this._result.mpDamage || 0;
        // スリップ固定値の取得
        let fixVal = getSlipFixVal(this, "MP", "mp") || 0;
        if (fixVal) {
            // スリップ率の取得
            const slipRate = getSlipRate(this, "MP", "mp");
            // 固定値にスリップ率を適用
            fixVal = Math.floor(fixVal * (fixVal < 0 ? slipRate.minus : slipRate.plus));
            // MPに反映
            if (fixVal != 0) {
                this.gainMp(fixVal);
                // 元のダメージをリザルトに再追加
                this._result.mpDamage += oriDamage;
            }
        }
    };


    //- TPスリップ固定値(コア追加)
    const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
    Game_Battler.prototype.regenerateTp = function() {
        _Game_Battler_regenerateTp.apply(this);
        // スリップ固定値の取得
        let fixVal = getSlipFixVal(this, "TP", "tp") || 0;
        if (fixVal) {
            // スリップ率の取得
            const slipRate = getSlipRate(this, "TP", "tp");
            // 固定値にスリップ率を適用
            fixVal = Math.floor(fixVal * (fixVal < 0 ? slipRate.minus : slipRate.plus));
            // TPに反映
            if (fixVal != 0) {
                this.gainSilentTp(fixVal);
            }
        }
    };


    //- スリップ固定値の取得
    function getSlipFixVal(battler, word, wordE) {
        const states = battler._states;
        if (!states || !states.length) { return; }
        let val = 0;
        states.forEach(stateId => {
            const state = $dataStates[stateId];
            // メモ欄から固定値を取得
            let valStr = state.meta[word + "スリップ値"] || state.meta[wordE + "slipVal"];
            if (!valStr) { return; }
            valStr = valStr.replace(/\s/g, "");
            // 加算
            val += -Number(valStr);
        });
        return val;
    };



    //==================================================
    //--  スリップ演出
    //==================================================

    //- スリップ演出のメモ欄から取得して実行(コア追加)
    const _Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function() {
        // スリップ演出の実行
        doSlipEffect(this);
        _Game_Battler_regenerateAll.apply(this);
    };


    //- スリップ演出の実行
    function doSlipEffect(battler) {
        // メモ欄からのスリップ演出の取得
        const effect = getSlipEffectByMemo(battler);
        if (!effect) { return; }
        // ディレイ
        const delay = effect["ディレイ"];
        const delayEx = Math.round(delay / 60 * 1000);
        // アニメの表示
        showAnime(battler, battler, effect["アニメーション"]);
        // 効果音の再生
        setTimeout(playSe, delayEx, effect["効果音"]); 
        // 画面フラッシュの表示
        setTimeout(showScreenFlash, delayEx, effect);
        // フリーアニメ・スキルの実行
        doFreeAnimeSkill(battler, battler, effect["フリーアニメ"]);
        // ダメージポップのディレイ
        if (delayEx) {
            battler._popupDelayKeSlct = delayEx;
            setTimeout(remPopupDelay, delayEx, battler);
        }
    };


    //- メモ欄からのスリップ演出の取得
    function getSlipEffectByMemo(battler) {
        const states = battler._states;
        if (!states || !states.length) { return; }
        let effect = null;
        let maxPriority = null;
        states.forEach(stateId => {
            const state = $dataStates[stateId];
            // メモ欄から演出名を取得
            let tageName = state.meta["スリップ演出"] || state.meta["slipEffect"];
            if (!tageName) { return; }
            tageName = tageName.replace(/\s/g, "");
            // 登録した演出を取得
            const effectData = keke_slipEffects.find(d => d["演出名"] == tageName);
            if (!effectData) { return; }
            // 優先度の判定
            const priority = Number(effectData["優先度"]);
            if (!maxPriority || priority >= maxPriority) {
                effect = effectData;
                maxPriority = priority;
            }
        });
        return effect;
    };


    //- アニメの表示
    function showAnime(subject, target, animeId) {
        if (!animeId) { return; }
        Window_BattleLog.prototype.showAnimation(subject, [target], animeId);
    };


    //- 効果音の再生
    function playSe(ses) {
        if (!ses || !ses.length) { return; }
        ses.forEach(se => {
            if (!se) { return; }
            AudioManager.playSe({ name:se["ファイル"], volume:se["音量"], pitch:se["ピッチ"], pan:se["位相"] });
        });
        
    };


    //- 画面フラッシュの表示
    function showScreenFlash(d) {
        if (!d["画面フラッシュ"] || !d["…フラッシュ色" || !d["…フラッシュ時間"]]) { return; }
        const delay = d["…フラッシュ遅延"] || 0;
        if (delay) {
            setTimeout(screenFlash, delay * 1000 / 60, d);
        } else {
            screenFlash(d);
        }
    };


    //- 画面フラッシュ
    function screenFlash(d) {
        $gameScreen.startFlash(d["…フラッシュ色"], d["…フラッシュ時間"]);
    };


    //- フリーアニメ・スキルの実行
    function doFreeAnimeSkill(subject, target, note) {
        if (!isFreeAnime() || !note) { return; }
        // アニメファイルとコモンを取得
        const metaList = metaAll(note, ["フリーアニメ", "freeAnime"]);
        if (!metaList || !metaList.length) { return; }
        metaList.forEach(meta => {
            //-フリーアニメ・スキルの実行-個別
            BattleManager.doFreeAnimeSkillKe(meta, subject, [target]);
        });
    };


    //- フリーアニメフラグ
    function isFreeAnime() {
        return PluginManager._scripts.some(n => n == "Keke_FreeAnime");
    };


    //- ポップアップディレイ時はポップアップ開始を遅らせる
    const _Window_BattleLog_popupDamage = Window_BattleLog.prototype.popupDamage;
    Window_BattleLog.prototype.popupDamage = function(target) {
        if (target._popupDelayKeSlct) {
            setTimeout(startDamagePopup, target._popupDelayKeSlct, target);
            target._popupDelayKeSlct = null;
            return
        }
        _Window_BattleLog_popupDamage.apply(this, arguments);
    };


    //- ダメージポップアップの開始
    function startDamagePopup(target) {
        if (!target) { return; }
        if (target.shouldPopupDamage()) {
            target.startDamagePopup();
        }
    };


    //- ポップアップディレイの解除
    function remPopupDelay(battler) {
        if (!battler) { return; }
        battler._popupDelayKeSlct = null;
    };



    //==================================================
    //--  メタ取得 /ベーシック
    //==================================================
    
    //- 全てのメタ配列の合算
    function totalAllMetaArray(battler, words, action) {
        let data = null
        let array = [];
        // バトラー値
        data = battler._actorId ? battler.actor() : battler.enemy();
        if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            battler._equips.forEach(equip => {
                data = equip.object();
                if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            });
        }
        // ステート値
        battler._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        });
        // アクション値
        if (action) {
            data = action.item();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        }
        // スペース削除
        array = array.map(e => e.replace(/\s/g, ""));
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    
    //- 全取得メタ
    function metaAll(note, words) {
        var result = [];
        words.forEach(word => {
            var regText = '\<' + word + ':([^\>]*)\>';
            var regExp_g = new RegExp(regText, 'g');
            var regExp = new RegExp(regText);
            var matches = note.match(regExp_g);
            if (matches) {
                matches.forEach(function(line) {
                    const match = line.match(regExp);
                    const vals = match[1].replace(/\s/g, "").split(",");
                    result.push(match[1]);
                });
            }
        });
        return result;
    };

})();