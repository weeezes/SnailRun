var gamejs = require('gamejs');

var Bomb = function(startPosition) {
    Bomb.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load('./images/bomb.png');

    this.rect = this.image.getRect();
    this.rect.bottomleft = [startPosition, 0];
    
    this.speed = 10;
    this.acceleration = 9.81;
    
    return this;
};

gamejs.utils.objects.extend(Bomb, gamejs.sprite.Sprite);

Bomb.prototype.update = function(msDuration) {
    	this.rect.moveIp(0, msDuration*this.speed/1000.0);

		this.speed += this.acceleration

		if (this.rect.bottom >= gamejs.display.getSurface().getSize()[1]) {
			//playerScore += 1
			this.kill();
        }
};

exports.Bomb = Bomb;