//=============================================================================
// IRPP_MV_BattleRewardEX.js
//=============================================================================

/*:
 * @plugindesc (※下部)戦闘報酬を変数で操作します。
 * @author イロスマRPG制作委員会
 *
 * @param ExpRate VID
 * @desc 獲得経験値の割合を指定する変数のIDです。
 * @default 6
 * @type variable
 *
 * @param GoldRate VID
 * @desc 獲得金額の割合を指定する変数のIDです。
 * @default 7
 * @type variable
 *
 * @param DropRate VID
 * @desc アイテム入手率の割合を指定する変数のIDです。
 * @default 8
 * @type variable
 *
 * @help 変数の値が100の時は獲得倍率が100％(通常の倍率)となります。
 * ニューゲーム時に指定された変数の値は100になります。
 * また、戦闘が終わると指定された変数の値は100に戻ります。
 */

var Imported = Imported || {};
Imported.IRPP_MV_BattleRewardEX = true;
(function() {
var Parameters = PluginManager.parameters('IRPP_MV_BattleRewardEX');
var expRate_VID = Number(Parameters['ExpRate VID'] || 6);
var goldRate_VID = Number(Parameters['GoldRate VID'] || 7);
var dropRate_VID = Number(Parameters['DropRate VID'] || 8);

var _DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _DataManager_setupNewGame.call(this);
    $gameVariables.setValue(expRate_VID, 100);
    $gameVariables.setValue(goldRate_VID, 100);
    $gameVariables.setValue(dropRate_VID, 100);
};

var _DataManager_setupBattleTest = DataManager.setupBattleTest;
DataManager.setupBattleTest = function() {
    _DataManager_setupBattleTest.call(this);
    $gameVariables.setValue(expRate_VID, 100);
    $gameVariables.setValue(goldRate_VID, 100);
    $gameVariables.setValue(dropRate_VID, 100);
};

var _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    $gameVariables.setValue(expRate_VID, 100);
    $gameVariables.setValue(goldRate_VID, 100);
    $gameVariables.setValue(dropRate_VID, 100);
    _BattleManager_updateBattleEnd.call(this);
};

var _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function() { 
    return Math.max(Math.ceil(_Game_Troop_expTotal.call(this) * $gameVariables.value(expRate_VID) * 0.01), 0);
};

var _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    return Math.max(Math.ceil(_Game_Troop_goldTotal.call(this) * $gameVariables.value(goldRate_VID) * 0.01), 0);
};

var _Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
Game_Enemy.prototype.dropItemRate = function() {
    return Math.max(Math.ceil(_Game_Enemy_dropItemRate.call(this) * $gameVariables.value(dropRate_VID) * 0.01), 0);
};
})();