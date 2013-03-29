var gamejs = require('gamejs');
var Bomb = require('./bomb').Bomb;

var BombDropper = function(dropRate, maxBombs) {
    this.bombs = new gamejs.sprite.Group();
    
    this.maxBombs = maxBombs;
    this.dropRate = dropRate;
    this.msTimeFromLastDrop = 0;
    
    return this;
};

BombDropper.prototype.update = function(msDuration) {
    if (this.bombs.sprites.length < this.maxBombs && this.msTimeFromLastDrop > this.dropRate) {
        var pos = Math.random()*gamejs.display.getSurface().getSize()[0];
        this.bombs.add(new Bomb(pos));
        
		this.msTimeFromLastDrop = 0;
    }
    
    this.bombs.update(msDuration);
    
    this.msTimeFromLastDrop += msDuration;
};

BombDropper.prototype.draw = function(surface) {
    this.bombs.draw(surface);
};

exports.BombDropper = BombDropper;