//=============================================================================
// Keke_VariableActorCommand - 可変アクターコマンド
// バージョン: 1.2.3
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc アクターコマンドを自在に組み替える
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【ver.1.2.3】
 * アクターコマンドを自在に組み替えることができる
 *
 * ● 特徴 ●
 * ■キャラごとにコマンド自由構成
 * ■コマンド数に応じたウインドウ自動伸縮
 * ■コマンドの動的変更
 *
 *
 * ● 使い方 ●
 * 設定はデータベースのメモ欄で行う
 *
 * ■コマンドを追加(削除)
 * アクター、職業、装備、スキル、アイテム、ステートのメモ欄に
 *
 * <コマンド: (-)(コマンド)(/)(タイプ/ID), (表示順), (表示名), (アイコンID),
 *   (ヘルプ)>
 *
 * ★(-)(コマンド)
 * 追加するコマンド。6種類から選ぶ
 * ◎攻撃
 * 　通常攻撃。スキルID 1 のスキル
 * ◎防御
 * 　防御。スキルID 2 のスキル
 * ◎スキル
 * 　スキルコマンド。
 * ◎アイテム
 * 　アイテムコマンド
 * ◎逃げる
 * 　戦闘から逃げる。パーティコマンド版と同じ
 * ◎オート
 * 　自動戦闘。パーティ全員が自動で戦う
 * ※頭に - を付けた場合
 * 　コマンド削除になる
 *
 * ★(/)(スキルタイプ/ID)
 * この部分はスキル/アイテムのときのみ書く。スキルタイプかIDのどちらか
 * ◎スキルタイプ
 * 　スキルのときのみ
 * 　スキルタイプ名を書くと、そのスキルタイプがコマンドとして追加される
 * ◎ID
 * 　スキルIDを書くと、そのスキル個別がコマンドとして追加される
 * 　アイテムIDならそのアイテム個別
 *
 * ★(表示順)
 * コマンドの表示される順番。数値が小さいほど上に表示される
 *
 * ★(表示名)
 * コマンドの実際に表示される名前。省略可能
 * 省略した場合、コマンド本来の名前がそのまま表示される
 *
 * ★(アイコンID)
 * 表示するアイコンのID。省略可能
 * 省略すると基本的にはアイコンを表示しないが、
 * スキル個別のときのみ、そのスキル本来のアイコンを表示する
 * 
 * ★(ヘルプ)
 * 表示するヘルプメッセージ。省略可能
 * プラグインパラメータ → ヘルプ登録　でヘルプを登録し、
 * そのヘルプ名を書く
 *
 * ※コマンド追加がひとつでもある時点で、デフォのコマンドは無効化される
 *
 * ●具体例
 * ◎このようなコマンド構成にする場合
 * 　ブラッドスティア(スキルID162)
 * 　魔剣技(スキルタイプ『攻撃特技』, アイコンID 76)
 * 　破壊魔法(スキルタイプ『攻撃魔法』, アイコンID 79)
 * 　聖魔法(スキルタイプ『回復魔法』, アイコンID 72)
 * 　ハイガード(防御コマンド)
 * 　アイテム(アイテムコマンド, アイコンID 165)
 * 　逃げる(逃げるコマンド, アイコンID 82)
 * 　オート(自動コマンド, アイコンID 83)
 *
 * 　<コマンド:スキル/162,10>
 * 　<コマンド:スキル/攻撃特技,20,魔剣技,76>
 * 　<コマンド:スキル/攻撃魔法,30,破壊魔法,79>
 * 　<コマンド:スキル/回復魔法,40,聖魔法,72>
 * 　<コマンド:防御,50,ハイガード>
 * 　<コマンド:アイテム,60, ,165>
 * 　<コマンド:逃げる,70, ,82>
 * 　<コマンド:オート,80, ,83>
 *
 * ◎スキルタイプ『攻撃魔法』『回復魔法』をコマンドから消す場合
 * 　<コマンド:-スキル/攻撃魔法>
 * 　<コマンド:-スキル/回復魔法>
 *
 * ◎スキル『ファイナルスティア』(スキルID164)をコマンドの一番上に追加する場合
 * 　<コマンド:スキル/164,1>
 *
 * 
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * Actor commands can be rearranged freely
 *
 * ● Features ●
 * Free configuration of commands for each character
 * ■ Automatic expansion/contraction of windows according
 *   to the number of commands
 * ■ Dynamic change of commands
 *
 *
 * ● How to use ●
 * Set in the memo field of the database
 *
 * ■ Added (deleted) commands
 * Actors, classes, equipment, skills, items, and state memos
 *
 * <command: (-) (command) (/) (type/ID), (display order), (display name)
 *   (icon ID), (help)>
 *
 * ★ (-) (command)
 * Command to add. Choose from 6 types
 * ◎ Attack
 *   Normal attack. Skill with skill ID 1
 * ◎ Defense
 *   Defense. Skill with skill ID 2
 * ◎ Skills
 *   Skill commands.
 * ◎ Item
 *   Item command
 * ◎ Escape
 *   Run away from battle. Same as party command version
 * ◎ Auto
 *   Auto Combat. All parties automatically fight
 * ※ When - is added to the head
 *   Delete command
 *
 * ★ (/) (skill type/ID)
 * Write this part only for skills/items. Either skill type or ID
 * ◎ Skill type
 *   only for skills
 *   Writing a skill type name will add that skill type as a command
 * ◎ ID
 *   If you write a skill ID, that skill will be added as a command
 *   Item ID for each item
 *
 * ★ (display order)
 * The order in which commands are displayed.
 * The smaller the number, the higher it is displayed
 *
 * ★ (display name)
 * The actual visible name of the command. Optional
 * If omitted, the original name of the command is displayed as is.
 *
 * ★ (Icon ID)
 * ID of the icon to display. Optional
 * If omitted, the icon is basically not displayed, but
 * Display the skill's original icon only when the skill is individual
 *
 * ★ (Help)
 * Help message to display. Optional
 * Register help with plug-in parameters → help registration,
 * Write that help name
 *
 * ※ When there is even one command added, the default command is disabled.
 *
 * ● Concrete example
 * ◎ When using such a command structure
 *   Blood Steer (Skill ID 162)
 *   Magical Sword Skill (Skill Type "Attack Skill", Icon ID 76)
 *   Destruction Magic (Skill Type "Attack Magic", Icon ID 79)
 *   Holy Magic (Skill Type "Recovery Magic", Icon ID 72)
 *   High Guard (defense command)
 *   Item (item command, icon ID 165)
 *   Escape (escape command, icon ID 82)
 *   Auto (auto command, icon ID 83)
 *
 *   <command: Skill/162,10>
 *   <command: Skill/Attack Skill, 20, Magic Sword Skill, 76>
 *   <command: Skill/Attack Magic, 30, Destruction Magic, 79>
 *   <command: Skill/Recovery Magic, 40, Holy Magic, 72>
 *   <command: Defense, 50, High Guard>
 *   <command: item,60, ,165>
 *   <command: Escape, 70, ,82>
 *   <command: Auto,80, ,83>
 *
 * ◎When removing the skill type ``attack magic'' and ``recovery magic''
 *   from the command
 *   <command: -Skill/Attack Magic>
 *   <command: -Skill/Recovery Magic>
 *
 * ◎When adding the skill "Final Star" (skill ID 164)
 *   to the top of the command
 *   <command: Skill/164,1>
 *
 *
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 * 
 * 
 * 
 * @param ウインドウ
 *
 * @param ウインドウ自動伸縮
 * @parent ウインドウ
 * @desc ウインドウをコマンド数に応じて自動伸縮させる
 * @type boolean
 * @default true
 *
 * @param ウインドウ伸縮下端
 * @parent ウインドウ
 * @desc この座標より下には伸びず上に伸びていく
 * @default 616
 *
 * @param ウインドウ不透明度
 * @parent ウインドウ
 * @desc ウインドウの不透明度(0〜255)
 * @default 255
 *
 * @param アイコン
 *
 * @param アイコン表示
 * @parent アイコン
 * @desc アイコンを表示する
 * @type boolean
 * @default true
 *
 * @param アイコンサイズ
 * @parent アイコン
 * @desc アイコンの大きさ(ピクセル)
 * @default 32
 *
 * @param アイコンX位置
 * @parent アイコン
 * @desc アイコンのX位置(ピクセル)
 * @default -4
 *
 * @param アイコンY位置
 * @parent アイコン
 * @desc アイコンのY位置(ピクセル)
 * @default 0
 *
 * @param アイコン配置
 * @parent アイコン
 * @desc アイコンをウインドウ左に配置するか右に配置する
 * @type select
 * @option 左
 * @option 右
 * @default 左
 *
 *
 * @param タッチボタン
 *
 * @param キャンセルボタン自動移動
 * @parent タッチボタン
 * @desc 自動的にキャンセルボタンをコマンド上方に移動する
 * @type select
 * @option 上に配置
 * @option 左上に配置
 * @option 右上に配置
 * @option 無効
 * @default 上に配置
 *
 * @param ヘルプ
 * 
 * @param ヘルプ登録
 * @parent ヘルプ
 * @desc ヘルプメッセージを登録する。メモ欄からヘルプ名を書くことで呼び出せる
 * @type struct<help>[]
 * @default []
 * 
 * @param スキルヘルプ表示
 * @parent ヘルプ
 * @desc アクターコマンドでもスキルのヘルプを表示する
 * @type boolean
 * @default true
 * 
 * @param その他
 *
 * @param パーティコマンド無効
 * @parent その他
 * @desc パーティコマンドを表示しなくする
 * @type boolean
 * @default false
 *
 * @param 用語・自動戦闘
 * @parent その他
 * @desc 自動戦闘の呼び方
 * @default オート
 */
 
 

//==================================================
/*~struct~help:
//==================================================
/*
 * @param ヘルプ名
 * @desc ヘルプの名前。メモ欄からの呼び出しに使う
 * @default 
 * 
 * @param テキスト
 * @desc ヘルプのテキスト内容
 * @type multiline_string
 * @default 
 * 
 * @param アイコン
 * @desc 表示するアイコン
 * @type icon
 * @default 
 */
 


(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  スプライト追加 /ベーシック
    //==================================================
    
    //- 破棄付きスプライト
    function SpriteKeVrac() {
        this.initialize(...arguments);
    }

    SpriteKeVrac.prototype = Object.create(Sprite.prototype);
    SpriteKeVrac.prototype.constructor = SpriteKeVrac;

    SpriteKeVrac.prototype.destroy = function() {
        if (this.bitmap && !this.bitmap._url) { this.bitmap.destroy(); }
        Sprite.prototype.destroy.apply(this);
    };



    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    //- 真偽化
    function toBoolean(str) {
        if (!str) { return false; }
        const str2 = str.toString().toLowerCase();
        if (str2 == "true" || str2 == "on") { return true; }
        if (str2 == "false" || str2 == "off") { return false; }
        return Number(str);
    };

    let parameters = PluginManager.parameters(pluginName);
    
    //- ウインドウ
    const keke_windowAutoResize = toBoolean(parameters["ウインドウ自動伸縮"]);
    const keke_windowResizeMax = Number(parameters["ウインドウ伸縮下端"]);
    const keke_windowOpacity = Number(parameters["ウインドウ不透明度"]);
    
    //- アイコン
    const keke_iconShow = toBoolean(parameters["アイコン表示"]);
    const keke_iconSize = Number(parameters["アイコンサイズ"]);
    const keke_iconPosX = Number(parameters["アイコンX位置"]);
    const keke_iconPosY = Number(parameters["アイコンY位置"]);
    const keke_iconRel = parameters["アイコン配置"];
    
    //- タッチボタン
    const keke_cancelAutoRepos = parameters["キャンセルボタン自動移動"];

    //- ヘルプ
    const keke_helpList = parameters["ヘルプ登録"] ? JSON.parse(parameters["ヘルプ登録"]).map(d => JSON.parse(d)) : [];
    const keke_showSkillHelp = toBoolean(parameters["スキルヘルプ表示"]);
    
    //- その他
    const keke_noPartyCommand = toBoolean(parameters["パーティコマンド無効"]);
    const keke_autoBattleWord = parameters["用語・自動戦闘"];

    parameters = null;
    
    
    
    //==================================================
    //--  共通開始
    //==================================================
    
    //- ウインドウ・アクターコマンド(コア追加)
    const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function(rect) {
        _Window_ActorCommand_initialize.apply(this, arguments);
        this._iconSpritesKe = [];
    };
    
    
    
    //==================================================
    //--  共通更新
    //==================================================
    
    //- シーンバトル(コア追加)
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this);
        // 自動戦闘の更新
        updateAutoBattle(this);
    };
    
    
    //==================================================
    //--  共通処理
    //==================================================
    
    //- コマンドリストの作成(コア追加)
    const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        // 独自コマンドリストの作成
        if (!makeCommandListFree(this)) {
            _Window_ActorCommand_makeCommandList.apply(this);
        }
        // 不透明度
        this.opacity = keke_windowOpacity;
        // ウインドウのリサイズ
        resizeWindow(this);
        // キャンセルボタンの再配置
        setTimeout(reposCancelButton, 0, this);
        // ウインドウのリチルド
        rechildWindow(this);
    };
    
    
    
    //==================================================
    //--  アクターコマンド自由構成
    //==================================================

    // アイコン番号
    let iconIndex = 0;
    // ヘルプテキスト
    let helpText = "";

    //- 自由コマンドリストの作成
    function makeCommandListFree(windo) {
        if (!windo._actor) { return 0; }
        let addData = [];
        let delData = [];
        const actor = windo._actor;
        // コマンドリストのクリア
        windo.clearCommandList();
        // アイコンの消去
        delIcon(windo);
        // メモ欄からコマンドノート取得
        let cmdNotes = totalAllMetaArray(actor, ["コマンド", "cmd"]);
        // 多重職業に対応
        if (actor._additionalClassIds) {
            actor._additionalClassIds.forEach(classId => {
                if (!classId) { return; }
                const classObje = $dataClasses[classId];
                if (!classObje) { return; }
                cmdNotes = [...cmdNotes, ...metaAll(classObje.note, ["コマンド", "command"]).map(e => e.replace(/\s/g, "")).filter(e => e)];
            });
        }
        // コマンドデータにセット
        cmdNotes.forEach(note => {
            const data = note.split(",");
            const type = data[0];
            const order = data[1] || 0;
            const name = data[2] ? data[2].replace(/\s/g, "") : "";
            const iconIndex = data[3] || 0;
            const helpName = data[4] ? data[4].replace(/\s/g, "") : "";
            let del = false;
            // シンボル取得
            let symbol = "";
            if (type.includes("攻撃") || type.includes("attack")) { symbol = "attack"; }
            if (type.includes("防御") || type.includes("guard")) { symbol = "guard"; }
            if (type.includes("スキル") ||type.includes("skill")) { symbol = "skill"; }
            if (type.includes("アイテム") || type.includes("item")) { symbol = "item"; }
            if (type.includes("逃げる") || type.includes("escape")) { symbol = "escape"; }
            if (type.includes("オート") || type.includes("auto")) { symbol = "auto"; }
            // シンボルがなければリターン
            if (!symbol) { return }
            // スキルタイプ/スキル個別取得
            let id = 1;
            if (symbol == "skill") {
                const tps = type.split("/");
                if (tps[1]) {
                    // 数字ならスキル個別
                    if (tps[1].match(/\d+/)) {
                        symbol = "skillOne";
                        id = Number(tps[1]);
                    // 単語ならスキルタイプ
                    } else {
                        id = $dataSystem.skillTypes.indexOf(tps[1]) || 1;
                    }
                }
            }
            // アイテム個別取得
            if (symbol == "item") {
                const tps = type.split("/");
                if (tps[1]) {
                    symbol = "itemOne";
                    id = Number(tps[1]);
                }
            }
            // 消去かどうか
            del = type.startsWith("-") ? true : false;
            // 消去セット
            if (del) {
                delData.push({ symbol:symbol, id:id });
            // 追加セット
            } else {
                addData.push({ symbol:symbol, id:id, name:name, order:order, iconIndex:iconIndex, helpName:helpName });
            }
        });
        // 追加データを順番に応じてソート
        addData.sort((a, b) => a.order - b.order);
        // 消去データの分を消去
        addData = addData.filter(add => {
            const dels = delData.filter(del => del.symbol == add.symbol && del.id == add.id);
            return !dels.length;
        });
        // 重複を削除
        addData = [...new Set(addData)];
        // 追加データからコマンド内容生成
        addData.forEach(data => {
            iconIndex = data.iconIndex;
            // ヘルプテキストの取得
            helpText = getHelpText(data);
            // シンボルからコマンド内容を取得
            switch (data.symbol) {
                case "attack":
                    windo.addCommand(data.name || TextManager.attack, "attack", actor.canAttack());
                    break;
                case "guard":
                    windo.addCommand(data.name || TextManager.guard, "guard", actor.canGuard());
                    break;
                case "skill":
                    windo.addCommand(data.name || $dataSystem.skillTypes[data.id], "skill", true, data.id);
                    break;
                case "skillOne":
                    const skill = $dataSkills[data.id];
                    //if (!helpText && skill && keke_showSkillHelp) { helpText = skill.description; }
                    windo.addCommand(data.name || skill.name, "skillOne", actor.canUse(skill), data.id);
                    break;
                case "item":
                    windo.addCommand(data.name || TextManager.item, "item");
                    break;
                case "itemOne":
                    const item = $dataItems[data.id];
                    //if (!helpText && item && keke_showSkillHelp) { helpText = item.description; }
                    windo.addCommand(data.name || item.name, "itemOne", actor.canUse(item), data.id);
                    break;
                case "escape":
                    windo.addCommand(data.name || TextManager.escape, "escape", BattleManager.canEscape());
                    break;
                case "auto":
                    windo.addCommand(data.name || keke_autoBattleWord, "auto");
                    break;
            }
            iconIndex = 0;
            helpText = "";
        });
        return addData.length;
    };


    //- ヘルプテキストの取得
    function getHelpText(data) {
        if (data.helpName || data.name) {
            const text = findHelpText([data.helpName, data.name], data );
            if (text) { return text;}
        }
        if (data.symbol == "attack") {
            const text = findHelpText(["攻撃", "attack"], data);
            if (text) { return text;}
        }
        if (data.symbol == "guard") {
            const text = findHelpText(["防御", "guard"], data);
            if (text) { return text;}
        }
        if (data.symbol == "skill") {
            const text = findHelpText([$dataSystem.skillTypes[data.id], "スキル", "skill"], data);
            if (text) { return text;}
        }
        if (data.symbol == "skillOne") {
            const text = getSkillHelp(data, "skill");
            if (text) { return text;}
        }
        if (data.symbol == "item") {
            const text = findHelpText(["アイテム", "item"], data);
            if (text) { return text;}
        }
        if (data.symbol == "itemOne") {
            const text = getSkillHelp(data, "item");
            if (text) { return text;}
        }
        if (data.symbol == "escape") {
            const text = findHelpText(["逃げる", "escape"], data);
            if (text) { return text;}
        }
        if (data.symbol == "auto") {
            const text = findHelpText(["オート", "auto"], data);
            if (text) { return text;}
        }
        return "";
    };


    //- ヘルプテキストの検索
    function findHelpText(names, data) {
        for (let name of names) {
            for (let d of keke_helpList) {
                if (d["ヘルプ名"] == name) {
                    // アイコンも変更
                    if (d["アイコン"] && !iconIndex) { iconIndex = d["アイコン"]; }
                    return d["テキスト"];
                }
            }
        };
        return "";
    };


    //- スキルヘルプの取得
    function getSkillHelp(data, cmdType) {
        const obje = cmdType == "skill" ? $dataSkills[data.id] : cmdType == "item" ? $dataItems[data.id] : null;
        if (obje) { return obje.description; }
        return "";
    };


    //- 独自コマンドExtの追加(コア追加)
    const _Window_ActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
    Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled = true, ext = null) {
        _Window_ActorCommand_addCommand.apply(this, arguments);
        const last = this._list[this._list.length - 1];
        if (iconIndex) { last.iconIndex = iconIndex; }
        if (helpText) { last.helpText = helpText; }
    };


    //- 独自コマンドの追加(コア追加)
    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.apply(this);
        const acWindow = this._actorCommandWindow;
        // 個別スキル
        acWindow.setHandler("skillOne", commandSkillOne.bind(this));
        // 個別アイテム
        acWindow.setHandler("itemOne", commandItemOne.bind(this));
        // 逃げる
        acWindow.setHandler("escape", this.commandEscape.bind(this));
        // 自動戦闘
        acWindow.setHandler("auto", commandAutoBattle.bind(this));
    };
    
    
    //- コマンド・個別スキル
    function commandSkillOne() {
        const action = BattleManager.inputtingAction();
        if (!action || !action._item) { return; };
        const skillId = this._actorCommandWindow.currentExt();
        action.setSkill(skillId);
        this.onSelectAction();
    };
    
    
    //- コマンド・個別アイテム
    function commandItemOne() {
        const action = BattleManager.inputtingAction();
        if (!action || !action._item) { return; };
        const itemId = this._actorCommandWindow.currentExt();
        action.setItem(itemId);
        this.onSelectAction();
    };
    


    //==================================================
    //--  アクターコマンド/ヘルプ
    //==================================================

    //- ヘルプの更新 呼び出し
    const _Window_ActorCommand_select = Window_ActorCommand.prototype.select;
    Window_ActorCommand.prototype.select = function(index) {
        updateHelp(this, index);
        return _Window_ActorCommand_select.apply(this, arguments)
    };


    //- ヘルプの更新
    function updateHelp(windo, index) {
        const helpWindow = SceneManager._scene._helpWindow;
        if (!helpWindow) { return; }
        helpWindow.clear();
        helpWindow.hide();
        const currentData = index >= 0 ? windo._list[index] : null;
        if (!currentData) { return; }
        const helpText = currentData.helpText;
        if (!helpText) { return; }
        helpWindow.setText(helpText);
        helpWindow.show();
    };


    
    //==================================================
    //--  アイコンの描画
    //==================================================

    //- アイコン描画呼び出し(コア追加)
    const _Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
    Window_ActorCommand.prototype.drawItem = function(index) {
        setTimeout(drawIcon, 0, this, index);
        _Window_ActorCommand_drawItem.apply(this, arguments);
    };
    
    
    //- アイコン描画
    function drawIcon(windo, index) {
        if (!keke_iconShow) { return; }
        const currentData = index >= 0 ? windo._list[index] : null;
        if (!currentData) { return; }
        const symbol = currentData.symbol;
        const id = currentData.ext;
        let iconIndex = currentData.iconIndex;
        const rect = windo.itemLineRect(index);
        const scene = SceneManager._scene;
        const wPad = $gameSystem.windowPadding();
        const attackId = windo._actor.attackSkillId();
        const guardId = windo._actor.guardSkillId();
        const iconW = ImageManager.iconWidth;
        const iconH = ImageManager.iconHeight;
        const isRight = keke_iconRel == "右";
        // スキルアイコンがあったら取得
        if (symbol == "attack" && !iconIndex) { iconIndex = $dataSkills[attackId] ? $dataSkills[attackId].iconIndex : 0; }
        if (symbol == "guard" && !iconIndex) { iconIndex =  iconIndex = $dataSkills[guardId] ? $dataSkills[guardId].iconIndex : 0;; }
        if (symbol == "skillOne" && !iconIndex) { iconIndex = $dataSkills[id] ? $dataSkills[id].iconIndex : 0; }
        if (symbol == "itemOne" && !iconIndex) { iconIndex = $dataItems[id] ? $dataItems[id].iconIndex : 0; }
        // アイコン描画
        if (iconIndex) {
            // スプライト形成
            const iconSprite = createIconSprite(iconIndex);
            scene.addChild(iconSprite);
            windo._iconSpritesKe.push(iconSprite);
            // 拡大
            const iconTw = keke_iconSize; 
            const scale = iconTw / iconW;
            iconSprite.scale.x = scale;
            iconSprite.scale.y = scale
            // 位置
            iconSprite.x = windo.x + wPad + rect.x + (isRight ? rect.width + iconTw / 2 - keke_iconPosX :  - iconTw / 2 + keke_iconPosX);
            iconSprite.y = windo.y + wPad + rect.y + iconTw / 2 + (rect.height - iconTw * 0.75) / 2 + keke_iconPosY;
        }
    };
    
    
    //- アイコンの消去
    function delIcon(windo) {
        if (!windo._iconSpritesKe.length) { return; }
        const scene = SceneManager._scene;
        windo._iconSpritesKe.forEach(sprite => scene.removeChild(sprite));
        windo._iconSpritesKe = []; 
    };
    
    
    //- ウインドウ閉じるときアイコンも消す(コア追加)
    const _Window_ActorCommand_close = Window_ActorCommand.prototype.close;
    Window_ActorCommand.prototype.close = function() {
        _Window_ActorCommand_close.apply(this);
        // アイコンの消去
        delIcon(this);
    };
    
    
    //- ウインドウを出すときアイコンも出す(コア追加)
    const _Window_ActorCommand_show = Window_ActorCommand.prototype.show;
    Window_ActorCommand.prototype.show = function() {
        _Window_ActorCommand_show.apply(this);
        this._iconSpritesKe.forEach(sprite => sprite.visible = true);
    };
    
    
    //- ウインドウを消すときアイコンも消す(コア追加)
    const _Window_ActorCommand_hide = Window_ActorCommand.prototype.hide;
    Window_ActorCommand.prototype.hide = function() {
        _Window_ActorCommand_hide.apply(this);
        this._iconSpritesKe.forEach(sprite => sprite.visible = false);
    };
    
    
    
    //================================================== 
    //--  アクターコマンド自動伸縮
    //==================================================
    
    //- ウインドウのリサイズ
    function resizeWindow(windo) {
        // 自動伸縮でなければリターン
        if (!keke_windowAutoResize) { return; }
        // 基本のY位置を保存
        if (windo._oriYKe == null) { windo._oriYKe = windo.y; }
        // コマンド数取得
        let cmdNum = windo._list.length;
        // 高さ変更
        windo.height = windo.fittingHeight(cmdNum) * 1;
        // ウインドウ下端
        const downMax = windo._oriYKe + windo.fittingHeight(cmdNum);
        // 画面外に出ないようにする
        windo.y = windo._oriYKe;
        if (downMax > keke_windowResizeMax) { windo.y -= downMax - keke_windowResizeMax; }
    };
    
    
    //- 高さ拡大(コア追加)
    const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        let result = _Scene_Battle_actorCommandWindowRect.apply(this);
        // 自動伸縮時のみ
        if (keke_windowAutoResize) { result.height = Graphics.height; }
        return result;
    };
    
    
    //- キャンセルボタンの再配置
    function reposCancelButton(windo) {
        const scene = SceneManager._scene;
        if (keke_cancelAutoRepos == "無効") { return; }
        if (!scene._cancelButton) { return; }
        const button = scene._cancelButton;
        const pos = keke_cancelAutoRepos;
        if (pos == "上に配置") {
            button.x = windo.x;
            button.y = windo.y - button.height - 4;
        } else if (pos == "左上に配置") {
            // 左上に配置
            posLeftUp(windo, button)
        } else if (pos == "右上に配置") {
            // 右上に配置
            posRightUp(windo, button)
        }
    };


    //- 左上に配置
    function posLeftUp(windo, button) {
        // 画面左端に出さない
        let leftMax = windo.x - button.width;
        if (leftMax < 0) {
            posRightUp(windo, button);
            return;
        }
        button.x = windo.x - button.width;
        button.y = windo.y;
    };


    //- 右上に配置
    function posRightUp(windo, button) {
        // 画面右端に出さない
        let rightMax =  windo.x + windo.width + button.width;
        if (rightMax > Graphics.width) {
            posLeftUp(windo, button);
            return;
        }
        button.x = windo.x + windo.width
        button.y = windo.y;
    };


    //- ウインドウのリチルド
    function rechildWindow(windo) {
        if (windo.parent) { windo.parent.addChild(windo); }
        const button = SceneManager._scene._cancelButton;
        if (button && button.parent) { button.parent.addChild(button); }
    };


    //- キャンセルボタン押し中は敵キャラ決定しない(コア追加)
    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const cancelButton = this._cancelButton;
        if (cancelButton && cancelButton._hovered) { return false; }
        _Scene_Battle_onEnemyOk.apply(this);
    };
    
    
    
    //==================================================
    //--  自動戦闘
    //==================================================
    
    //- 自動戦闘フラグ(コア追加)
    const _Game_BattlerBase_isAutoBattle = Game_BattlerBase.prototype.isAutoBattle;
    Game_BattlerBase.prototype.isAutoBattle = function() {
        let result = _Game_BattlerBase_isAutoBattle.apply(this);
        if (this._autoBattleKe) { result = true; }
        return result;
    };
    
    
    //- コマンド・自動戦闘
    function commandAutoBattle() {
        // 個別フラグオン
        $gameParty.battleMembers().forEach(actor => {
            actor._autoBattleKe = true;
            actor.makeAutoBattleActions();
        });
        // 全体フラグオン
        this._inAutoBattleKe = true;
        // ウインドウ閉じる
        this.closeCommandWindows();
        this.selectNextCommand();
    };
    
    
    //- コマンド・自動戦闘(個別)
    function commandAutoBattleOne(scene) {
        // 個別フラグオン
        const actor = BattleManager.actor();
        // アクターがいないならリターン
        if (!actor) { return; }
        actor._autoBattleKe = true;
        // 全体フラグオン
        scene._inAutoBattleKe = true;
        // アクション作成
        actor.makeAutoBattleActions();
        // ウインドウ閉じる
        scene.closeCommandWindows();
        scene.selectNextCommand();
    };
    
    
    //- 自動戦闘の解除
    function endAutoBattle(scene) {
        // 個別フラグオフ
        $gameParty.battleMembers().forEach(actor => {
            actor._autoBattleKe = false;
        });
        // 全体フラグオフ
        scene._inAutoBattleKe = false;
    };
    
    
     // 自動戦闘の解除(ボタン)
    function endAutoBattleBtn(scene) {
        // 自動戦闘の解除
        endAutoBattle(scene);
        // サウンド
        SoundManager.playCancel();
    };
    
    
    //- 自動戦闘の更新
    function updateAutoBattle(scene) {
        // 自動戦闘中、キャンセルボタンか画面タッチで
        if (scene._inAutoBattleKe && (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered())) {
            // 自動戦闘終了
            endAutoBattleBtn(scene);
        }
    };
    
    
    //- 戦闘終了時に自動戦闘解除(コア追加)
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.apply(this);
        endAutoBattle(this);
    };


    //==================================================
    //--  パーティコマンド無効(コア追加)
    //==================================================
    
    const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        // パーティコマンド無効なら
        if (keke_noPartyCommand) {
            // カレントアクターが空になったら
            if (BattleManager.isInputting() && !BattleManager.actor()) {
                // 次のインプット可アクターをセット
                for (const actor of $gameParty.battleMembers()) {
                    if (actor.canInput()) {
                        BattleManager._currentActor = actor;
                        break;
                    }
                }
                // インプット可アクターがいないならコマンド終了
                if (!BattleManager._currentActor) {
                    this.endCommandSelection();
                    return;
                }
            }
        }
        _Scene_Battle_changeInputWindow.apply(this);
    };
    
    
    
    //==================================================
    //--  メタ配列 /ベーシック
    //==================================================
     
    // 全てのメタ配列を合算
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
        }, battler);
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
            var match = null;
            if (matches) {
                matches.forEach(function(line) {
                    result.push(line.match(regExp)[1]);
                });
            }
        });
        return result;
    };
    
    
    
    //==================================================
    //--  アイコンスプライト /ベーシック
    //==================================================
    
    //- アイコンスプライトの形成
    function createIconSprite(iconIndex, anchorX = 0.5, anchorY = 0.5) {
        const sprite = new SpriteKeVrac();
        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        const bitmap = ImageManager.loadSystem("IconSet");
        sprite.bitmap = bitmap;
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        sprite.setFrame(sx, sy, pw, ph);
        return sprite;
    };
    
})();