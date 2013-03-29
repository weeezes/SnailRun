var gamejs = require('gamejs');
var input = require('./input');

var Snail = function(input, startPosition) {
    Snail.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load('./images/snail.png');

    this.rect = this.image.getRect();
    this.rect.bottomleft = startPosition;
    
    this.goingLeft = true;
    this.speed = 150;

    this.input = input;
    
    return this;
};

gamejs.utils.objects.extend(Snail, gamejs.sprite.Sprite);

Snail.prototype.turnSide = function(goingLeft) {
    if (this.goingLeft === goingLeft) {
        this.image = gamejs.transform.flip(this.image, true, false);
        this.goingLeft = !this.goingLeft;
    }
};

Snail.prototype.update = function(msDuration) {
    if (this.input.left) {
        this.turnSide(false);
    
        if (this.rect.topleft[0] >= 0) {
            this.rect.moveIp(-msDuration*this.speed/1000.0, 0);
        } else {
            this.rect.topleft[0] = 0;
        }
    }
    else if (this.input.right)
    {
        this.turnSide(true);
        
        if (this.rect.topright[0] <= gamejs.display.getSurface().getSize()[0]) {
            this.rect.moveIp(msDuration*this.speed/1000.0, 0);
        } else {
            this.rect.topright[0] = gamejs.display.getSurface().getSize()[0];
        }
    }
};

exports.Snail = Snail;