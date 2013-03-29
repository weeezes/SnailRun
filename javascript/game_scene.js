var gamejs = require('gamejs');

var Snail = require('./snail').Snail;
var input = require('./input');
var BombDropper = require('./bomb_dropper').BombDropper;

var GameoverScene = require('./gameover_scene').GameoverScene;

var GameScene = function(director) {
    this.director = director;
    
    this.background = gamejs.image.load('./images/background.png');
    
    this.snail_controls = new input.UserControls();
    this.snail = new Snail(this.snail_controls, [director.width/2, director.height]);

    this.bombDropper = new BombDropper(1000, 10);

    return this;
};

GameScene.prototype.handleEvent = function(event) {
    if (event.type === gamejs.event.KEY_UP || event.type === gamejs.event.KEY_DOWN) {
        this.snail.input.handle(event);
    }
};

GameScene.prototype.update = function(msDuration) {
    this.snail.update(msDuration);
    this.bombDropper.update(msDuration);
    
    if (gamejs.sprite.spriteCollide(this.snail, this.bombDropper.bombs, false).length > 0) {
        this.director.pushScene(new GameoverScene(this.director));
    }
};

GameScene.prototype.draw = function(display) {        
    display.blit(this.background);

    this.snail.draw(display);

    this.bombDropper.draw(display);
};

gamejs.preload(['./images/snail.png', './images/background.png', './images/bomb.png']);

exports.GameScene = GameScene;