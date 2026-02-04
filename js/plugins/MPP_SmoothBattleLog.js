//=============================================================================
// MPP_SmoothBattleLog.js
//=============================================================================
// Copyright (c) 2018-2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Change the display method and behavior of the battle log to speed up the progress of the battle.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 2.1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Overview
 *  - By making the battle log display method cumulative, sentences will not
 *    disappear immediately even if the log progresses quickly.
 *  - You can check the battle past log from the party command.
 * 
 * ▼ Log Type
 *  〇 all
 *   - The battle log window disappears after a certain amount of time has
 *     passed since the last log was displayed.
 *  〇 1-line
 *   - The logs are deleted in order from the log that has passed a certain
 *     period of time since it was displayed.
 *
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Log Type
 *      @desc 
 *      @type select
 *          @option all
 *          @option 1-line
 *      @default 1-line
 * 
 *  @param Max Lines
 *      @desc Maximum number of lines displayed in the battle log
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Message Speed
 *      @desc Battle log display speed
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 8
 * 
 *  @param View Duration
 *      @desc Battle log display time
 * (0:Always displayed)
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 150
 * 
 *  @param Font Size
 *      @desc The size of the characters in the battle log
 *          @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 *  @param Wait New Line?
 *      @desc Whether or not there is a weight when a new log is added.
 * If it behaves strangely, enable it.
 *      @type boolean
 *      @default false
 * 
 *  @param Start Messages On Log?
 *      @desc Whether to display the battle start message in the log
 *      @type boolean
 *      @default false
 * 
 *  @param Log Command
 *      @desc Command name to display battle past log
 * (Hide when empty)
 *      @default Battle Log
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘ログの表示方法や動作を変更し、戦闘の進行を早くします。
 * @author 木星ペンギン
 * @url
 *
 * @help [version 2.1.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ 概要
 *  - 戦闘ログの表示方法を蓄積型にすることで、ログ進行が早くても文章がすぐに
 *    消えることがなくなります。
 *  - パーティコマンドから戦闘過去ログを確認することができます。
 * 
 * ▼ ログタイプ
 *  〇 まとめて消去
 *   - 最後のログが表示されてから一定時間がたつと戦闘ログウィンドウが
 *     非表示となります。
 *  〇 一行ずつ消去
 *   - 表示されてから一定時間経過したログから順に消去されます。
 *
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Log Type
 *      @text ログタイプ
 *      @desc 戦闘ログの消去タイプ
 *      @type select
 *          @option まとめて消去
 *          @value all
 *          @option 一行ずつ消去
 *          @value 1-line
 *      @default 1-line
 * 
 *  @param Max Lines
 *      @text ログ最大行数
 *      @desc 戦闘ログの最大表示行数
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Message Speed
 *      @text メッセージ速度
 *      @desc 戦闘ログの表示速度
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 8
 * 
 *  @param View Duration
 *      @text 表示時間
 *      @desc 戦闘ログの表示時間
 * (0:常時表示)
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 150
 * 
 *  @param Font Size
 *      @text 文字の大きさ
 *      @desc 戦闘ログの文字の大きさ
 *      @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 *  @param Wait New Line?
 *      @text ログ追加時のウェイト
 *      @desc 新しいログが追加された際のウェイトの有無。
 * 挙動がおかしくなる場合は有効化してください。
 *      @type boolean
 *      @default false
 * 
 *  @param Start Messages On Log?
 *      @text 戦闘開始メッセージ
 *      @desc 戦闘開始メッセージをログに表示するかどうか
 *      @type boolean
 *      @default false
 * 
 *  @param Log Command
 *      @text ログコマンド名
 *      @desc 戦闘過去ログを表示するコマンド名
 * (空で非表示)
 *      @default 戦闘ログ
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_SmoothBattleLog';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    
    const param_LogType = parameters['Log Type'] || '1-line';
    const param_MaxLines = Number(parameters['Max Lines'] || 6);
    const param_MessageSpeed = Number(parameters['Message Speed'] || 8);
    const param_FontSize = Number(parameters['Font Size'] || 26);
    const param_ViewDuration = Number(parameters['View Duration'] || 150);
    const param_WaitNewLine = parameters['Wait New Line?'] === 'true';
    const param_StartMessagesOnLog = parameters['Start Messages On Log?'] === 'true';
    const param_LogCommand = parameters['Log Command'] || '';
    
    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };
    
    // Math extend
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        const tri = (n) => n * (n + 1) / 2;
        return { clamp, mod, tri };
    })();

    //-------------------------------------------------------------------------
    // BattleManager

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        if (!param_StartMessagesOnLog) {
            _BattleManager_displayStartMessages.apply(this, arguments);
        }
    };

    BattleManager.displayStartMessagesOnLog = function() {
        for (const name of $gameTroop.enemyNames()) {
            this._logWindow.push('addText', TextManager.emerge.format(name));
        }
        const message = this.initiativeMessage();
        if (message) {
            this._logWindow.push('wait');
            this._logWindow.push('addText', message);
        }
        this._logWindow.push('clear');
    };

    BattleManager.initiativeMessage = function() {
        if (this._preemptive) {
            return TextManager.preemptive.format($gameParty.name());
        } else if (this._surprise) {
            return TextManager.surprise.format($gameParty.name());
        }
        return null;
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);
        this._logWindow.clearSmoothBattleLog();
    };

    //-------------------------------------------------------------------------
    // Game_Temp

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._battleLog = [];
    };

    Game_Temp.prototype.clearBattleLog = function() {
        this._battleLog = [];
    };

    Game_Temp.prototype.battleLog = function() {
        return this._battleLog;
    };

    Game_Temp.prototype.addBattleLog = function(text) {
        this._battleLog.push(text);
        if (this._battleLog.length > 100) this._battleLog.shift();
    };

    //-------------------------------------------------------------------------
    // Window_Base

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        if (code === 'MX') {
            textState.x += this.obtainEscapeParam(textState);
        } else {
            _Window_Base_processEscapeCharacter.apply(this, arguments);
        }
    };

    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function(rect) {
        this._clearDuration = 0;
        this._logScrollYDuration = 0;
        this._logScrollY = this.lineHeight();
        _Window_BattleLog_initialize.apply(this, arguments);
        this.createLogSprites();
        this.drawBackground();
    };

    // overwrite
    Window_BattleLog.prototype.maxLines = function() {
        return param_MaxLines;
    };

    Window_BattleLog.prototype.createLogSprites = function() {
        this._logSprites = [];
        const width = this.itemWidth();
        const height = this.itemHeight();
        for (let i = 0; i <= this.maxLines(); i++) {
            const sprite = new Sprite_BattleLog(width, height);
            this._logSprites[i] = sprite;
            this.addInnerChild(sprite);
        }
    };

    const _Window_BattleLog_resetFontSettings = __base(Window_BattleLog.prototype, 'resetFontSettings');
    Window_BattleLog.prototype.resetFontSettings = function() {
        _Window_BattleLog_resetFontSettings.apply(this, arguments);
        this.contents.fontSize = param_FontSize;
    };

    // overwrite
    Window_BattleLog.prototype.messageSpeed = function() {
        return param_MessageSpeed;
    };

    Window_BattleLog.prototype.backRect = function() {
        return new Rectangle(0, 0, this.innerWidth, this.innerHeight);
    };

    const _Window_BattleLog_lineRect = Window_BattleLog.prototype.lineRect
    Window_BattleLog.prototype.lineRect = function(index) {
        const rect = _Window_BattleLog_lineRect.apply(this, arguments);
        rect.y = 0;
        return rect;
    };

    const _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        _Window_BattleLog_update.apply(this, arguments);
        this.updateLogScroll();
        this.updateLogSprites();
    };
    
    Window_BattleLog.prototype._updateContentsBack = function() {
        const bitmap = this._contentsBackSprite.bitmap;
        if (bitmap) {
            const lineHeight = this.lineHeight();
            let height = (this.numLines() + 1) * lineHeight - this._logScrollY;
            height = Math.min(height, bitmap.height);
            this._contentsBackSprite.setFrame(0, 0, bitmap.width, height);
        }
    };

    Window_BattleLog.prototype.updateLogScroll = function() {
        if (this._logScrollYDuration > 0) {
            const d = this._logScrollYDuration;
            const sy = this.lineHeight() - this._logScrollY;
            this._logScrollY += sy * d / MathExt.tri(d);
            this._logScrollYDuration--;
        }
    };
    
    Window_BattleLog.prototype.updateLogSprites = function() {
        const lineHeight = this.lineHeight();
        const maxLine = this.maxLines() - 1;
        this._logSprites.forEach((sprite, i) => {
            sprite.update(lineHeight * i - this._logScrollY, maxLine);
        });
        if (this._clearDuration > 0) {
            this._clearDuration--;
            const d = this._clearDuration;
            const max = Math.min(16, param_ViewDuration);
            if (d < max) this._clientArea.opacity = 255 * d / max;
            if (d === 0) this.clearSmoothBattleLog();
        } else if (this.numLines() > 0 && this._logSprites[1].isPassed()) {
           this.shiftLine();
        }
    };

    Window_BattleLog.prototype.shiftLine = function() {
        this._lines.shift();
        const sprite = this._logSprites.shift();
        sprite.bitmap.clear();
        this._logSprites.push(sprite);
        this._logScrollY -= this.lineHeight();
        this._logScrollYDuration = 16;
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        this._baseLineStack = [];
        if (param_LogType === 'all') this._clearDuration = param_ViewDuration;
    };
    
    Window_BattleLog.prototype.clearSmoothBattleLog = function() {
        _Window_BattleLog_clear.call(this);
        for (const sprite of this._logSprites) {
            sprite.bitmap.clear();
        }
        this._logScrollYDuration = 0;
        this._logScrollY = this.lineHeight();
    };

    // overwrite
    Window_BattleLog.prototype.waitForEffect = function() {};

    // overwrite
    Window_BattleLog.prototype.addText = function(text) {
        const indentText = this.indentText(text);
        this._lines.push(indentText);
        if (this.numLines() > this.maxLines()) this.shiftLine();
        $gameTemp.addBattleLog(indentText);
        const index = this.numLines() - 1;
        this._logSprites[index + 1].popup();
        this.drawLineText(index);
        this.wait();
        this._clearDuration = 0;
        this._clientArea.opacity = 255;
    };

    Window_BattleLog.prototype.indentText = function(text) {
        const indent = this._baseLineStack.length;
        return `\\mx[${indent * 16}]${text}`;
    };

    // overwrite
    Window_BattleLog.prototype.popBaseLine = function() {
        this._baseLineStack.pop();
    };

    const _Window_BattleLog_waitForNewLine = Window_BattleLog.prototype.waitForNewLine;
    Window_BattleLog.prototype.waitForNewLine = function() {
        if (param_WaitNewLine) {
            _Window_BattleLog_waitForNewLine.apply(this, arguments);
        }
    };

    const _Window_BattleLog_drawLineText = Window_BattleLog.prototype.drawLineText;
    Window_BattleLog.prototype.drawLineText = function(index) {
        const baseContents = this.contents;
        this.contents = this._logSprites[index + 1].bitmap;
        _Window_BattleLog_drawLineText.apply(this, arguments);
        this.contents = baseContents;
    };

    // overwrite
    Window_BattleLog.prototype.startTurn = function() {};

    //-------------------------------------------------------------------------
    // Sprite_BattleLog
    
    function Sprite_BattleLog() {
        this.initialize(...arguments);
    }

    Sprite_BattleLog.prototype = Object.create(Sprite.prototype);
    Sprite_BattleLog.prototype.constructor = Sprite_BattleLog;

    Sprite_BattleLog.prototype.initialize = function(width, height) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(width, height);
        this._scrollXDuration = 0;
        this._viewDuration = -1;
    };

    Sprite_BattleLog.prototype.update = function(y, max) {
        Sprite.prototype.update.call(this);
        if (this._scrollXDuration > 0) this._scrollXDuration--;
        if (this._viewDuration > 0) this._viewDuration--;
        this.updatePosition(y, max);
        this.updateFrame(y);
        this.updateOpacity();
    };

    Sprite_BattleLog.prototype.updatePosition = function(y, max) {
        const height = this.bitmap.height;
        this.x = MathExt.tri(this._scrollXDuration) / 2;
        this.y = MathExt.clamp(y, 0, max * height);
    };

    Sprite_BattleLog.prototype.updateFrame = function(y) {
        const fy = Math.max(-y, 0);
        const width = this.bitmap.width;
        const height = this.bitmap.height;
        this.setFrame(0, fy, width, height - fy);
    };

    Sprite_BattleLog.prototype.updateOpacity = function() {
        this.opacity = 255 - this._scrollXDuration * 20;
    };

    Sprite_BattleLog.prototype.isPassed = function() {
        return this._viewDuration === 0;
    };

    Sprite_BattleLog.prototype.popup = function(scrollXDuration = 12) {
        this._scrollXDuration = scrollXDuration;
        if (param_LogType === '1-line') {
            this._viewDuration = param_ViewDuration || -1;
        }
    };

    //-------------------------------------------------------------------------
    // Window_PastBattleLog

    function Window_PastBattleLog() {
        this.initialize(...arguments);
    }

    Window_PastBattleLog.prototype = Object.create(Window_Selectable.prototype);
    Window_PastBattleLog.prototype.constructor = Window_PastBattleLog;

    Window_PastBattleLog.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.openness = 0;
        this._data = [];
    };

    Window_PastBattleLog.prototype.maxItems = function() {
        return this._data.length;
    };

    Window_PastBattleLog.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        this.drawTextEx(this._data[index], rect.x, rect.y, rect.width);
    };

    Window_PastBattleLog.prototype.refresh = function() {
        this._data = $gameTemp.battleLog();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_PastBattleLog.prototype.selectBottom = function() {
        this.select(Math.max(this.maxItems() - 1, 0));
    };

    //-------------------------------------------------------------------------
    // Window_PartyCommand

    const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        _Window_PartyCommand_makeCommandList.apply(this, arguments);
        if (param_LogCommand !== '') {
            this.addCommand(param_LogCommand, 'pastLog');
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (
            _Scene_Battle_isAnyInputWindowActive.apply(this, arguments) ||
            this._pastLogWindow.active
        );
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.apply(this, arguments);
        $gameTemp.clearBattleLog();
    };

    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.apply(this, arguments);
        if (param_StartMessagesOnLog) {
            BattleManager.displayStartMessagesOnLog();
        }
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);
        this.createPastLogWindow();
    };

    // overwrite
    Scene_Battle.prototype.logWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(param_MaxLines, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.createPastLogWindow = function() {
        const rect = this.pastLogWindowRect();
        const pastLogWindow = new Window_PastBattleLog(rect);
        pastLogWindow.setHandler('cancel', this.onPastLogCancel.bind(this));
        this.addWindow(pastLogWindow);
        this._pastLogWindow = pastLogWindow;
    };

    Scene_Battle.prototype.pastLogWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this._statusWindow.y;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.apply(this, arguments);
        const method = this.commandPastLog.bind(this);
        this._partyCommandWindow.setHandler('pastLog', method);
    };

    Scene_Battle.prototype.commandPastLog = function() {
        this._pastLogWindow.refresh();
        this._pastLogWindow.open();
        this._pastLogWindow.selectBottom();
        this._pastLogWindow.activate();
    };

    Scene_Battle.prototype.onPastLogCancel = function() {
        this._pastLogWindow.close();
        this._pastLogWindow.deactivate();
        this._partyCommandWindow.activate();
    };

    const _Scene_Battle_closeCommandWindows = Scene_Battle.prototype.closeCommandWindows;
    Scene_Battle.prototype.closeCommandWindows = function() {
        _Scene_Battle_closeCommandWindows.apply(this, arguments);
        this._pastLogWindow.close();
        this._pastLogWindow.deactivate();
    };
    
})();
