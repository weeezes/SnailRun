var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Button = require('./button').Button;

var AboutScene = function(director) {    
    this.director = director;
    
    this.button = new Button('./images/about_screen.png', [director.width/2, director.height/2]);

    return this;
};

AboutScene.prototype.handleEvent = function(event) {
    this.button.handleEvent(event);
};

AboutScene.prototype.update = function(msDuration) {
    if (this.button.clicked) {
        this.director.popScene();
    }
    
    this.button.update(msDuration);
};

AboutScene.prototype.draw = function(display) {
    draw.rect(display, '#3B84EE', display.getRect());
    this.button.draw(display);
};

gamejs.preload(['./images/about_screen.png']);

exports.AboutScene = AboutScene;