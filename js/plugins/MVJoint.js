/*:
 * @plugindesc ツクールMZ上でMVのプラグインを無理やり動かします。
 * @author しぐれん
 * @target MZ
 * 
 * @help
 * プラグインの一番上に置いてください。
 * プラグイン競合による不具合を起こす原因になるので、使用の際は細心の注意を払ってください。
 * 
 * プラグインコマンドの呼び出し機能が入っています。
 * MV用の内容をそのまま貼り付ければ動きます。
 * 
 * 2020/09/05 公開
 * 
 * @command callCommand
 * @text プラグインコマンド
 * @desc MVのプラグインコマンドを呼び出します
 * 
 * @arg commandArg
 * @type string
 * @desc プラグインコマンドをMVと同じ方法で記載します。
 * @default 
 * 
 * 
*/
(function(){

    'use strict';
const PLUGIN_NAME='MVJoint';
PluginManager.registerCommand(PLUGIN_NAME,"callCommand",function(arg){
    this.command356([arg.commandArg]);
});
    

function isRect(value){
    return (typeof value )==="object";
}
function rectlize(x,y,w,h){
    if(isRect(x)){
        return x;
    }
    const newRect = new Rectangle(x,y,w,h);
    return newRect;
}

const Window_Base_initialize=Window_Base.prototype.initialize;
Window_Base.prototype.initialize =function(x,y,w,h){
    const rect = rectlize(x,y,w,h);
    Window_Base_initialize.call(this,rect);
};
Window_Base.prototype.standardPadding = function() {
    return 18;
};
const Window_Selectable_initialize=Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize =function(x,y,w,h){
    const rect = rectlize(x,y,w,h);
    Window_Selectable_initialize .call(this,rect);
};

const Window_Command_initialize=Window_Command.prototype.initialize;

Window_Command.prototype.initialize = function(XorRect, y) {
    if(isRect(XorRect)){
        Window_Command_initialize.call(this,XorRect);
        return;
    }
    //MV互換動作モード
    this._list =[];
    this.makeCommandList();
    const dummyRect = new Rectangle(XorRect,y,0,0);
    Window_Command_initialize.call(this,dummyRect);
    const width = this.windowWidth();
    const height = this.windowHeight();
    const rect = new Rectangle(this.x,this.y,width,height);
    this.move(rect.x,rect.y,rect.width,rect.height);
};
Window_Command.prototype.windowWidth = function() {
    return 240;
};

Window_Command.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
Window_Command.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};
Window_ItemCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

const dummyFunction=function(){};

ImageManager.reserveAnimation = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/animations/', filename, hue, true, reservationId);
};

ImageManager.reserveBattleback1 = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/battlebacks1/', filename, hue, true, reservationId);
};

ImageManager.reserveBattleback2 = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/battlebacks2/', filename, hue, true, reservationId);
};

ImageManager.reserveEnemy = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/enemies/', filename, hue, true, reservationId);
};

ImageManager.reserveCharacter = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/characters/', filename, hue, false, reservationId);
};

ImageManager.reserveFace = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/faces/', filename, hue, true, reservationId);
};

ImageManager.reserveParallax = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/parallaxes/', filename, hue, true, reservationId);
};

ImageManager.reservePicture = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/pictures/', filename, hue, true, reservationId);
};

ImageManager.reserveSvActor = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/sv_actors/', filename, hue, false, reservationId);
};

ImageManager.reserveSvEnemy = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/sv_enemies/', filename, hue, true, reservationId);
};

ImageManager.reserveSystem = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/system/', filename, hue, false, reservationId || this._systemReservationId);
};

ImageManager.reserveTileset = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/tilesets/', filename, hue, false, reservationId);
};

ImageManager.reserveTitle1 = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/titles1/', filename, hue, true, reservationId);
};

ImageManager.reserveTitle2 = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/titles2/', filename, hue, true, reservationId);
};

ImageManager.reserveBitmap = function(folder, filename, hue, smooth, reservationId) {
    if (filename) {
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.reserveNormalBitmap(path, hue || 0, reservationId || this._defaultReservationId);
        bitmap.smooth = smooth;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};

ImageManager.reserveNormalBitmap = function(path, hue, reservationId){
    
    var bitmap = this.loadNormalBitmap(path, hue);
    return bitmap;
};

ImageManager.loadNormalBitmap =function(path,hue){
    return this.loadBitmap(path);
};
(function(){
    const colorList ={
        crisisColor:ColorManager.crisisColor,
        ctGaugeColor1:ColorManager.ctGaugeColor1,
        ctGaugeColor2:ColorManager.ctGaugeColor2,
        damageColor:ColorManager.damageColor,
        deathColor:ColorManager.deathColor,
        deathColor:ColorManager.dimColor1,
        dimColor2:ColorManager.dimColor2,
        gaugeBackColor:ColorManager.gaugeBackColor,
        hpColor:ColorManager.hpColor,
        hpGaugeColor1:ColorManager.hpGaugeColor1,
        hpGaugeColor2:ColorManager.hpGaugeColor2,
        itemBackColor1:ColorManager.itemBackColor1,
        itemBackColor2:ColorManager.itemBackColor2,
        mpColor:ColorManager.mpColor,
        mpCostColor:ColorManager.mpCostColor,
        mpGaugeColor1:ColorManager.mpGaugeColor1,
        mpGaugeColor2:ColorManager.mpGaugeColor2,
        normalColor:ColorManager.normalColor,
        outlineColor:ColorManager.outlineColor,
        paramchangeTextColor:ColorManager.paramchangeTextColor,
        pendingColor:ColorManager.pendingColor,
        powerDownColor:ColorManager.powerDownColor,
        powerUpColor:ColorManager.powerUpColor,
        systemColor:ColorManager.systemColor,
        textColor:ColorManager.textColor,
        tpColor:ColorManager.tpColor,
        tpCostColor:ColorManager.tpCostColor,
        tpGaugeColor1:ColorManager.tpGaugeColor1,
        tpGaugeColor2:ColorManager.tpGaugeColor2
    };
    for (const key in colorList) {
        if (colorList.hasOwnProperty(key)) {
            const element = colorList[key];
            Window_Base.prototype[key] =function(){
                return element.apply(this,arguments);
            };
            
        }
    }


})();
const Scene_Battle_startEnemySelection =Scene_Battle.prototype.startEnemySelection ;
Scene_Battle.prototype.selectEnemySelection =function(){
    Scene_Battle_startEnemySelection.call(this);
};
Scene_Battle.prototype.startEnemySelection =function(){
    this.selectEnemySelection();
};

const Scene_Battle_startActorSelection =Scene_Battle.prototype.startActorSelection ;
Scene_Battle.prototype.selectActorSelection =function(){
    Scene_Battle_startActorSelection.call(this);
};

Scene_Battle.prototype.startActorSelection =function(){
    this.selectActorSelection();
};

Spriteset_Battle.prototype.battleback1Bitmap =function(){
    return this._back1Sprite.battleback1Bitmap();
};

Spriteset_Battle.prototype.battleback2Bitmap =function(){
    return this._back1Sprite.battleback2Bitmap();
};



})();
function Sprite_Base() {
    this.initialize.apply(this, arguments);
}

Sprite_Base.prototype = Object.create(Sprite.prototype);
Sprite_Base.prototype.constructor = Sprite_Base;

Sprite_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._animationSprites = [];
    this._effectTarget = this;
    this._hiding = false;
};

Sprite_Base.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updateAnimationSprites();
};

Sprite_Base.prototype.hide = function() {
    this._hiding = true;
    this.updateVisibility();
};

Sprite_Base.prototype.show = function() {
    this._hiding = false;
    this.updateVisibility();
};

Sprite_Base.prototype.updateVisibility = function() {
    this.visible = !this._hiding;
};

Sprite_Base.prototype.updateAnimationSprites = function() {
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
            }
        }
    }
};

Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_Base.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0;
};

Window_Base.prototype.textPadding = function() {
    return 6;
};
Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

Window_Selectable.prototype.itemRectForText = function(index) {
    var rect = this.itemRect(index);
    rect.x += this.textPadding();
    rect.width -= this.textPadding() * 2;
    return rect;
};

Scene_Base.prototype.isBottomHelpMode = function() {
    return false;
};
