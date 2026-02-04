// ==================================================
// Cae_AutoSwitchVars.js
// ==================================================

/**
 * @file Cae_AutoSwitchVars.js (RMMZ)
 * Change switches/variables when certain things happen.
 * @author Caethyril
 * @version 1.1
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.1 - Change switches/variables when certain things happen.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 * 
 * @help Features:
 *   Assign switches to various triggers in the plugin parameters.
 *   Those switches will automatically turn on at the appropriate time.
 *   Some variables can also be set to automatically update, e.g.
 *    - Save file ID:      set to the ID of the file selected on save.
 *    - Enemy death count: +1 per enemy death
 *   Note that you can still control the switches/variables manually as well.
 * 
 *   Further options are available using notetags...
 * 
 * Notetags:
 * 
 *   These are all in the format:
 *          <name: x, y>
 *     e.g. <name: 5, 10>
 *          <name: 1>
 *     Gives +y to variable ID x each time it triggers.
 *     If y is not specified, it will use a value of +1.
 *     y can be negative. Both x and y can optionally be JavaScript evals.
 * 
 *   Item Notetags:
 *          <buy var: x, y>
 *     Triggers once for each copy of the tagged item bought.
 *          <sell var: x, y>
 *     Triggers once for each copy of the tagged item sold.
 * 
 *   Item/Skill Notetag:
 *          <use var: x, y>
 *     Triggers each time anyone uses the tagged skill.
 * 
 *   Actor/Enemy Notetag:
 *          <death var: x, y>
 *     Triggers each time the tagged actor/enemy dies.
 * 
 * Suggested uses:
 *
 *   "Binding" events to switches:
 *    - Assign a common event with Parallel or Autorun trigger to a switch.
 *    - Have the event turn its switch off at the end, so it only runs once.
 *   Then set the switch to turn on every step, or when the timer ends, etc.
 * 
 *   The load trigger can be used to detect when the player loads a save.
 * 
 *   The counting variables may help to track certain statistics.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Game_Player:
 *                increaseSteps, performTransfer
 *              Game_Timer:
 *                update, onExpire
 *              DataManager:
 *                saveGame, loadGame
 *              SceneManager:
 *                goto, updateFrameCount
 *              BattleManager:
 *                startBattle, endBattle, abort, processVictory, processDefeat,
 *                onEscapeSuccess
 *              Scene_Shop:
 *                doBuy, doSell
 *              Game_Vehicle:
 *                getOn, getOff
 *              Game_Actor:
 *                die, useItem
 *              Game_Enemy:
 *                die
 *   This plugin does not add data to save files.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.1 (2020-10-25): Added - "Shop Buy Money" and "Shop Sell Money" params.
 *   v1.0 (2020-08-24): Initial release! Merge & extension of RMMV plugins.
 *
 * @param Step
 * @type switch
 * @desc This switch will turn on every time the player steps to another tile.
 * @default 0
 * 
 * @param Timer End
 * @type switch
 * @desc This switch will turn on when the game timer expires.
 * @default 0
 * 
 * @param Timer Frames
 * @type variable
 * @desc This variable will store the number of frames left on the timer. (Divide by 60 to get seconds.)
 * @default 0
 * 
 * @param Save
 * @type switch
 * @desc This switch will turn on every time the player saves their progress.
 * @default 0
 * 
 * @param Save ID
 * @parent Save
 * @type variable
 * @desc This variable will store the ID of the file the player chooses for saving.
 * @default 0
 * 
 * @param Load
 * @type switch
 * @desc This switch will turn on every time the player continues from a previous save.
 * @default 0
 * 
 * @param Load ID
 * @parent Load
 * @type variable
 * @desc This variable will store the ID of the file the player chooses to load.
 * @default 0
 * 
 * @param Change Map
 * @type switch
 * @desc This switch will turn on every time the player transfers to another map.
 * @default 0
 * 
 * @param New Game Change Map
 * @parent Change Map
 * @type boolean
 * @desc If true, the Change Map switch will turn on when starting a new game.
 * @default false
 * 
 * @param Menu Open
 * @type switch
 * @desc This switch will turn on every time the menu is opened.
 * @default 0
 * 
 * @param Menu Close
 * @type switch
 * @desc This switch will turn on every time the menu is closed.
 * @default 0
 * 
 * @param Get on Boat
 * @type switch
 * @desc This switch will turn on when the player gets on the Boat vehicle.
 * @default 0
 * 
 * @param Get on Ship
 * @type switch
 * @desc This switch will turn on when the player gets on the Ship vehicle.
 * @default 0
 * 
 * @param Get on Airship
 * @type switch
 * @desc This switch will turn on when the player gets on the Airship vehicle.
 * @default 0
 * 
 * @param Get off Boat
 * @type switch
 * @desc This switch will turn on when the player gets off the Boat vehicle.
 * @default 0
 * 
 * @param Get off Ship
 * @type switch
 * @desc This switch will turn on when the player gets off the Ship vehicle.
 * @default 0
 * 
 * @param Get off Airship
 * @type switch
 * @desc This switch will turn on when the player gets off the Airship vehicle.
 * @default 0
 * 
 * @param Battle Start
 * @type switch
 * @desc This switch will turn on when battle starts (on battle screen).
 * @default 0
 * 
 * @param Battle End
 * @type switch
 * @desc This switch will turn on when battle ends (on battle screen).
 * @default 0
 * 
 * @param Battle Victory
 * @type switch
 * @desc This switch will turn on when the player wins a battle.
 * @default 0
 * 
 * @param Battle Escape
 * @type switch
 * @desc This switch will turn on when the player escapes a battle.
 * @default 0
 * 
 * @param Battle Defeat
 * @type switch
 * @desc This switch will turn on when the player loses a battle.
 * @default 0
 * 
 * @param Battle Abort
 * @type switch
 * @desc This switch will turn on when the player aborts a battle.
 * @default 0
 * 
 * @param Actor Death
 * @type switch
 * @desc This switch will turn on when any party member dies.
 * @default 0
 * 
 * @param Dead Actor Count+
 * @parent Actor Death
 * @type variable
 * @desc This variable will increase by 1 every time an actor dies.
 * @default 0
 * 
 * @param Enemy Death
 * @type switch
 * @desc This switch will turn on when any enemy dies.
 * @default 0
 * 
 * @param Dead Enemy Count+
 * @parent Enemy Death
 * @type variable
 * @desc This variable will increase by 1 every time an enemy dies.
 * @default 0
 * 
 * @param Buy Any Item
 * @type switch
 * @desc This switch will turn on when the player buys any item from a shop.
 * @default 0
 * 
 * @param Buy Item Count+
 * @parent Buy Any Item
 * @type variable
 * @desc This variable will increase by the number of items purchased each time.
 * @default 0
 * 
 * @param Shop Buy Money+
 * @parent Buy Any Item
 * @type variable
 * @desc This variable will increase by the purchase price each time the player buys from a shop.
 * @default 0
 * 
 * @param Sell Any Item
 * @type switch
 * @desc This switch will turn on when the player sells any item to a shop.
 * @default 0
 * 
 * @param Sell Item Count+
 * @parent Sell Any Item
 * @type variable
 * @desc This variable will increase by the number of items sold each time.
 * @default 0
 * 
 * @param Shop Sell Money+
 * @parent Sell Any Item
 * @type variable
 * @desc This variable will increase by the sale price each time the player sells to a shop.
 * @default 0
 * 
 * @param Use Any Item
 * @type switch
 * @desc This switch will turn on when a party member uses any item.
 * @default 0
 * 
 * @param Use Item Count+
 * @parent Use Any Item
 * @type variable
 * @desc This variable will increase by 1 every time an item is used.
 * @default 0
 * 
 * @param Play Time
 * @type switch
 * @desc This switch will turn on every X frames in-game.
 * See the following parameters for configuration options.
 * @default 0
 * 
 * @param Play Time Interval
 * @parent Play Time
 * @type number
 * @min 1
 * @desc How often the Play Time switch turns on.
 * Default: 60 frames
 * @default 60
 * 
 * @param Play Time Scenes
 * @parent Play Time
 * @type combo[]
 * @option Scene_MenuBase
 * @option Scene_Map
 * @option Scene_Battle
 * @desc Scenes where the Play Time timer should continue counting.
 * @default ["Scene_Map","Scene_Battle"]
 * 
 * @param Play Time Count+
 * @parent Play Time
 * @type variable
 * @desc This variable will increase by 1 every frame update on a qualifying scene.
 * @default 0
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Notetag: Buy Var
 * @parent --- Advanced ---
 * @type string
 * @desc The name of the "buy variable" Item notetag.
 * Default: buy var
 * @default buy var
 * 
 * @param Notetag: Sell Var
 * @parent --- Advanced ---
 * @type string
 * @desc The name of the "sell variable" Item notetag.
 * Default: sell var
 * @default sell var
 * 
 * @param Notetag: Use Var
 * @parent --- Advanced ---
 * @type string
 * @desc The name of the "use variable" Item/Skill notetag.
 * Default: use var
 * @default use var
 * 
 * @param Notetag: Death Var
 * @parent --- Advanced ---
 * @type string
 * @desc The name of the "death variable" Actor/Enemy notetag.
 * Default: death var
 * @default death var
 */
//#endregion

(function() {
'use strict';

    const NAMESPACE   = 'AutoSwitchVars';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.1 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //

        void (f => { if (U[f]) return;
            /**
             * @param {Number} a - operand 1 (left)
             * @param {Number} b - operand 2 (right)
             * @param {String} op - operator: SET, ADD, SUB, MUL, DIV, or MOD
             * @returns {Number} Result of a op b.
             */
            U[f] = function(a, b, op) {
                switch (String(op || '').toUpperCase()) {
                    case 'SET': return b;
                    case 'ADD': return a + b;
                    case 'SUB': return a - b;
                    case 'MUL': return a * b;
                    case 'DIV': return a / b;
                    case 'MOD': return a.mod(b);
                    default:    return a;
                }
            };
        })('operate');

    // ======== Parameter stuff ======== //

        void (p => { 

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

            /**
             * String -> integer converter for switch/variable ID plugin parameters.
             * @param {String} paramName - Plugin parameter name
             * @returns {Number} Integer switch/variable ID.
             */
            $.parseId = function(paramName) { return parseInt(p[paramName], 10) || 0; };

            /**
             * String validation for notetag names via plugin parameters.
             * @param {String} paramName - Plugin parameter name without "Notetag: " prefix
             * @returns {String} Validated notetag name.
             */
            $.parseTagKey = function(paramName) {
                const dFault = (paramName || '').toLowerCase();
                const key = String(p['Notetag: ' + paramName] || '').trim();
                if (!key || key.includes('>')) {
                    console.warn(WARN_BADPAR.format(paramName, key, dFault));
                    return dFault;
                }
                return key;
            };

            // Switch IDs
            $.s = {
                step:       $.parseId('Step'),
                timeUp:     $.parseId('Timer End'),
                save:       $.parseId('Save'),
                load:       $.parseId('Load'),
                mnuOpen:    $.parseId('Menu Open'),
                mnuClose:   $.parseId('Menu Close'),
                changeMap:  $.parseId('Change Map'),
                bStart:     $.parseId('Battle Start'),
                bEnd:       $.parseId('Battle End'),
                bAbort:     $.parseId('Battle Abort'),
                bWin:       $.parseId('Battle Victory'),
                bEscape:    $.parseId('Battle Escape'),
                bLose:      $.parseId('Battle Defeat'),
                boatOn:     $.parseId('Get on Boat'),
                boatOff:    $.parseId('Get off Boat'),
                shipOn:     $.parseId('Get on Ship'),
                shipOff:    $.parseId('Get off Ship'),
                airshipOn:  $.parseId('Get on Airship'),
                airshipOff: $.parseId('Get off Airship'),
                actorDie:   $.parseId('Actor Death'),
                enemyDie:   $.parseId('Enemy Death'),
                buyAny:     $.parseId('Buy Any Item'),
                sellAny:    $.parseId('Sell Any Item'),
                useAnyItem: $.parseId('Use Any Item'),
                playTime:   $.parseId('Play Time')
            };
            Object.defineProperty($, 'sKeys', { get: () => Object.keys($.s) });
            $.newGameChangeMap = p['New Game Change Map'] === 'true';

            // Variable IDs
            $.v = {
                timer:      $.parseId('Timer Frames'),
                save:       $.parseId('Save ID'),
                load:       $.parseId('Load ID'),
                actorDie:   $.parseId('Dead Actor Count+'),
                enemyDie:   $.parseId('Dead Enemy Count+'),
                buyAny:     $.parseId('Buy Item Count+'),
                sellAny:    $.parseId('Sell Item Count+'),
                buyMoney:   $.parseId('Shop Buy Money+'),
                sellMoney:  $.parseId('Shop Sell Money+'),
                useAnyItem: $.parseId('Use Item Count+'),
                playTimeX:  $.parseId('Play Time Count+')
            };
            Object.defineProperty($, 'vKeys', { get: () => Object.keys($.v) });

            // Notetag names
            $.tags = {
                buy:  $.parseTagKey('Buy Var'),
                sell: $.parseTagKey('Sell Var'),
                use:  $.parseTagKey('Use Var'),
                die:  $.parseTagKey('Death Var')
            };
            Object.defineProperty($, 'TAG_SEP', { value: ',' });

            // Play Time trigger config values
            $.playTime = {
                active:   false,
                count:    0,
                interval: parseInt(p['Play Time Interval'], 10) || 60,
                scenes:   JSON.parse(p['Play Time Scenes'] || '[]')
            };

            // custom scriptable triggers to compensate for no parallels in battle?

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ========= Init Routines ========= //
    // ======== Utility (local) ======== //

        /**
         * Applies a value to a given game variable via a given operator
         * @param {Number} id - Game variable ID
         * @param {Number} b - Input value
         * @param {String} [op] - Operator used to combine operands
         */
        $.updateVar = function(id, b, op) {
            const a = $gameVariables.value(id);
            $gameVariables.setValue(id, U.operate(a, b, op));
        };

        /**
         * Changes a variable value appropriate to specified global trigger.
         * @param {String} trigger - Trigger that caused this method to be invoked
         * @param {Number} value - Operand value to apply
         * @param {String} [op] - Operator used to apply value: SET, ADD, SUB, MUL, DIV, MOD
         */
        $.procVar = function(trigger, value, op = 'SET') { $.updateVar($.v[trigger] || 0, value, op); };

        /**
         * Turns a switch on/off appropriate to specified global trigger.
         * @param {String} trigger - Trigger that caused this method to be invoked
         * @param {Boolean} [turnOn] - If true, turn on the switch, else turn off; default true
         */
        $.procSw = function(trigger, turnOn = true) { $gameSwitches.setValue($.s[trigger], turnOn); };

        /**
         * Triggers relevant effects for a specified global trigger.
         * @param {String} trigger - Trigger that caused this method to be invoked
         * @param {Number} [value] - Value to apply, for variables
         * @param {String} [op] - Operator used to apply value, for variables
         */
        $.proc = function(trigger, value, op) {
            if ($.vKeys.includes(trigger)) $.procVar(trigger, value, op);
            if ($.sKeys.includes(trigger)) $.procSw(trigger);
        };

        /**
         * Gets integer values from a notetag on a given database object.
         * @param {Object} obj - Database entry with meta property
         * @param {String} tagKey - Tag key as defined by this plugin
         * @returns {Number[]} Array of values.
         */
        $.tagInts = function(obj, tagKey) {
            const key = $.tags[tagKey];
            const tag = obj.meta[key];
            if (!tag) return [];
            return tag.split($.TAG_SEP).map((n, i) => {
                const r = parseInt(n, 10);
                return isNaN(r) ? i : r;
            });
        };

        /**
         * Fetches a variable ID and increment from specified notetag, then applies the increment to that variable
         * @param {Object} obj - Database entry with meta property
         * @param {String} tagKey - Tag key as defined by this plugin
         * @param {Number} [mult] - Multiplier for the increment
         */
        $.addFromTag = function(obj, tagKey, mult = 1) {
            const [id, b] = $.tagInts(obj, tagKey);
            if (id) $.updateVar(id, (b || 1) * mult, 'ADD');
        };

        /** 
         * Called to check for changing to, or from, a menu scene.
         * Catches direct submenu calls e.g. SceneManager.push(Scene_Item).
         */
        $.checkMenu = function() {
            const mnuNow = SceneManager._scene     instanceof Scene_MenuBase;
            const mnuNxt = SceneManager._nextScene instanceof Scene_MenuBase;
            const change = mnuNow ^ mnuNxt;
            if (change) $.proc('mnu' + (mnuNow ? 'Close' : 'Open'));
        };

        /** Update the play time switch/variable stuff. */
        $.updatePlayTime = function() {
            const PT = $.playTime;
            if (PT.active) {
                $.procVar('playTimeX', ++PT.count);
                if (!PT.count.mod(PT.interval)) $.procSw('playTime');
            }
        };

        /**
         * Called when the scene changes:
         * - updates Play Time counter active status;
         * - checks for Menu Open/Close triggers.
         */
        $.onSceneUpdate = function() {
            const PT = $.playTime;
            PT.active = PT.scenes.some(s => SceneManager._nextScene instanceof window[s]);
            $.checkMenu();
        };

    // ======== Plugin Commands ======== //
    // ============ Extends ============ //
    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Step trigger~
        void (alias => {
            Game_Player.prototype.increaseSteps = function() {
                alias.apply(this, arguments);
                $.proc('step');
            };
        })($.alias.Game_Player_increaseSteps = Game_Player.prototype.increaseSteps);

        // Alias! Chrono trigger~ (timer variable)
        void (alias => {
            Game_Timer.prototype.update = function(sceneActive) {
                if (sceneActive && this._working && this._frames > 0) {
                    $.procVar('timer', this._frames - 1);   // pre-empt
                }
                alias.apply(this, arguments);
            };
        })($.alias.Game_Timer_update = Game_Timer.prototype.update);

        // Alias! Time's up.
        void (alias => {
            Game_Timer.prototype.onExpire = function() {
                alias.apply(this, arguments);
                $.proc('timeUp');
            };
        })($.alias.Game_Timer_onExpire = Game_Timer.prototype.onExpire);

        // Alias! Save trigger~
        void (alias => {
            DataManager.saveGame = function(savefileId) {
                return alias.apply(this, arguments).then(s => $.proc('save', savefileId));
            };
        })($.alias.DataManager_saveGame = DataManager.saveGame);

        // Alias! Load trigger~
        void (alias => {
            DataManager.loadGame = function(savefileId) {
                return alias.apply(this, arguments).then(s => $.proc('load', savefileId));
            };
        })($.alias.DataManager_loadGame = DataManager.loadGame);

        // Alias! Scene change triggers~
        void (alias => {
            SceneManager.goto = function(sceneClass) {
                alias.apply(this, arguments);
                $.onSceneUpdate();
            };
        })($.alias.SceneManager_goto = SceneManager.goto);

        // Alias! Change map trigger~
        void (alias => {
            Game_Player.prototype.performTransfer = function() {
                const isNewMap = this.newMapId() !== $gameMap.mapId();
                alias.apply(this, arguments);
                if ($.blockTransferTrigger) delete $.blockTransferTrigger;
                else if (isNewMap && !this.newMapId()) $.proc('changeMap');
            };
        })($.alias.Game_Player_performTransfer = Game_Player.prototype.performTransfer);

        // Alias! Do not trigger on new game transfer~
        void (alias => { if ($.newGameChangeMap) return;
            Game_Player.prototype.setupForNewGame = function() {
                $.blockTransferTrigger = true;
                alias.apply(this, arguments);
            };
        })($.alias.Game_Player_setupForNewGame = Game_Player.prototype.setupForNewGame);

        // Alias! Battle start trigger~
        void (alias => {
            BattleManager.startBattle = function() {
                alias.apply(this, arguments);
                $.proc('bStart');
            };
        })($.alias.BattleManager_startBattle = BattleManager.startBattle);

        // Alias! Battle end trigger~
        void (alias => {
            BattleManager.endBattle = function(result) {
                alias.apply(this, arguments);
                $.proc('bEnd');
            };
        })($.alias.BattleManager_endBattle = BattleManager.endBattle);

        // Alias! Battle abort trigger~ (e.g. Abort Battle command, or when the timer expires in battle)
        void (alias => {
            BattleManager.abort = function() {
                alias.apply(this, arguments);
                $.proc('bAbort');
            };
        })($.alias.BattleManager_abort = BattleManager.abort);

        // Alias! Battle victory trigger~
        void (alias => {
            BattleManager.processVictory = function() {
                alias.apply(this, arguments);
                $.proc('bWin');
            };
        })($.alias.BattleManager_processVictory = BattleManager.processVictory);

        // Alias! Battle escape trigger~
        void (alias => {
            BattleManager.onEscapeSuccess = function() {
                alias.apply(this, arguments);
                $.proc('bEscape');
            };
        })($.alias.BattleManager_onEscapeSuccess = BattleManager.onEscapeSuccess);

        // Alias! Battle defeat trigger~
        void (alias => {
            BattleManager.processDefeat = function() {
                alias.apply(this, arguments);
                $.proc('bLose');
            };
        })($.alias.BattleManager_processDefeat = BattleManager.processDefeat);

        // Alias! Buy item triggers~
        void (alias => {
            Scene_Shop.prototype.doBuy = function(number) {
                alias.apply(this, arguments);
                $.addFromTag(this._item, 'buy', number);
                if (number > 0) {
                    $.proc('buyAny', number, 'ADD');
                    $.proc('buyMoney', number * this.buyingPrice(), 'ADD');
                }
            };
        })($.alias.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy);
    
        // Alias! Sell item triggers~
        void (alias => {
            Scene_Shop.prototype.doSell = function(number) {
                alias.apply(this, arguments);
                $.addFromTag(this._item, 'sell', number);
                if (number > 0) {
                    $.proc('sellAny', number, 'ADD');
                    $.proc('sellMoney', number * this.sellingPrice(), 'ADD');
                }
            };
        })($.alias.Scene_Shop_doSell = Scene_Shop.prototype.doSell);

        // Alias! Get on boat/ship/airship triggers~
        void (alias => {
            Game_Vehicle.prototype.getOn = function() {
                alias.apply(this, arguments);
                $.proc(this._type + 'On');
            };
        })($.alias.Game_Vehicle_getOn = Game_Vehicle.prototype.getOn);

        // Alias! Get off boat/ship/airship triggers~
        void (alias => {
            Game_Vehicle.prototype.getOff = function() {
                alias.apply(this, arguments);
                $.proc(this._type + 'Off');
            };
        })($.alias.Game_Vehicle_getOff = Game_Vehicle.prototype.getOff);

        // Alias! Actor death trigger...
        void (alias => {
            Game_Actor.prototype.die = function() {
                alias.apply(this, arguments);
                $.addFromTag(this.actor(), 'die');
                $.proc('actorDie', 1, 'ADD');
            };
        })($.alias.Game_Actor_die = Game_Actor.prototype.die);

        // Alias! Enemy death triggers~
        void (alias => {
            Game_Enemy.prototype.die = function() {
                alias.apply(this, arguments);
                $.addFromTag(this.enemy(), 'die');
                $.proc('enemyDie', 1, 'ADD');
            };
        })($.alias.Game_Enemy_die = Game_Enemy.prototype.die);

        // Alias! Use item/skill triggers~
        void (alias => {
            Game_Actor.prototype.useItem = function(item) {
                alias.apply(this, arguments);
                $.addFromTag(item, 'use');
                if (DataManager.isItem(item)) $.proc('useAnyItem', 1, 'ADD');
            };
        })($.alias.Game_Actor_useItem = Game_Actor.prototype.useItem);

        // Alias! Play time triggers~
        void (alias => {
            SceneManager.updateFrameCount = function() {
                alias.apply(this, arguments);
                $.updatePlayTime();
            };
        })($.alias.SceneManager_updateFrameCount = SceneManager.updateFrameCount);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();