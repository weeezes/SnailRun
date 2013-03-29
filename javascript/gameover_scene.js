var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Button = require('./button').Button;

var GameoverScene = function(director) {    
    this.director = director;
    
    this.button = new Button('./images/gameover_screen.png', [director.width/2, director.height/2]);

    return this;
};

GameoverScene.prototype.handleEvent = function(event) {
    this.button.handleEvent(event);
};

GameoverScene.prototype.update = function(msDuration) {
    if (this.button.clicked) {
        this.director.toBeginning();
    }
    
    this.button.update(msDuration);
};

GameoverScene.prototype.draw = function(display) {
    draw.rect(display, '#3B84EE', display.getRect());
    this.button.draw(display);
};

gamejs.preload(['./images/gameover_screen.png']);

exports.GameoverScene = GameoverScene;