var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Button = require('./button').Button;
var GameScene = require('./game_scene').GameScene;
var AboutScene = require('./about_scene').AboutScene;

var StartScene = function(director) {    
    this.director = director;
    
    this.startButton = new Button('./images/start.png', [director.width/2, director.height/3]);
    this.aboutButton = new Button('./images/about.png', [director.width/2, 2*director.height/3]);

    //for easier iteration
    this.buttons = new Array();
    this.buttons.push(this.startButton);
    this.buttons.push(this.aboutButton);
    
    return this;
};

StartScene.prototype.handleEvent = function(event) {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].handleEvent(event);
    }
};

StartScene.prototype.update = function(msDuration) {
    if (this.startButton.clicked) {
        this.director.pushScene(new GameScene(this.director));
    }
    if (this.aboutButton.clicked) {
        this.director.pushScene(new AboutScene(this.director));
    }
    
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update(msDuration);
    }
};

StartScene.prototype.draw = function(display) {
    draw.rect(display, '#3B84EE', display.getRect());
    
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw(display);
    }
};

gamejs.preload(['./images/start.png', './images/about.png']);

exports.StartScene = StartScene;