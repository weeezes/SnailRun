var gamejs = require('gamejs');
var input = require('./input');

var SpriteSheet = require('./animation').SpriteSheet;
var Animation = require('./animation').Animation;

var Snail = function(input, startPosition) {
    Snail.superConstructor.apply(this, arguments);

    var imageDimensions = {width: 44, height: 24};
    var spriteSheet = new SpriteSheet('./images/snail.png', imageDimensions);
    this.anim = new Animation(spriteSheet, {'stand': [0], 'walk': [0,1]});
    this.anim.start('stand');
    this.image = this.anim.update(1);
    
    this.rect = this.image.getRect();
    this.rect.bottomleft = startPosition;
    
    this.goingLeft = true;
    this.speed = 150;

    this.input = input;
    
    return this;
};

gamejs.utils.objects.extend(Snail, gamejs.sprite.Sprite);

Snail.prototype.turnSide = function(goingLeft) {
    if (!goingLeft) {
        this.image = gamejs.transform.flip(this.image, true, false);
    }
};

Snail.prototype.update = function(msDuration) {
    if (this.input.left) {
        if (this.anim.currentAnimation != 'walk') {
            this.anim.start('walk');
        }
        this.goingLeft = true;
        
        if (this.rect.topleft[0] >= 0) {
            this.rect.moveIp(-msDuration*this.speed/1000.0, 0);
        } else {
            this.rect.topleft[0] = 0;
        }
    }
    else if (this.input.right)
    {
        if (this.anim.currentAnimation != 'walk') {
            this.anim.start('walk');
        }
        this.goingLeft = false;
        
        if (this.rect.topright[0] <= gamejs.display.getSurface().getSize()[0]) {
            this.rect.moveIp(msDuration*this.speed/1000.0, 0);
        } else {
            this.rect.topright[0] = gamejs.display.getSurface().getSize()[0];
        }
    }
    else {
        this.anim.start('stand');
    }
    
    this.image = this.anim.update(msDuration);
    this.turnSide(this.goingLeft);
    
};

exports.Snail = Snail;

gamejs.preload(['./images/snail.png']);