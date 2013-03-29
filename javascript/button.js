var gamejs = require('gamejs');

var Button = function(image, centerPos) {
    Button.superConstructor.apply(this, arguments);
    
    this.image = gamejs.image.load(image);
    this.rect = this.image.getRect();
    this.rect.center = centerPos;
    
    this.clicked = false;
    
    return this;
};

gamejs.utils.objects.extend(Button, gamejs.sprite.Sprite);

Button.prototype.handleEvent = function(event) {
    // check if the event is a mouse down event and if it happened
    // inside our button
    if (event.type === gamejs.event.MOUSE_DOWN && !this.clicked) {
        if (event.pos[0] > this.rect.left && event.pos[0] < this.rect.right &&
            event.pos[1] > this.rect.top  && event.pos[1] < this.rect.bottom) {
            this.clicked = true;
        }
    }
};

Button.prototype.update = function(msDuration) {
    // toggle button back to ready state
    this.clicked = false;
};

exports.Button = Button;