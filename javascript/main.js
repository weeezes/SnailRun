var gamejs = require('gamejs');

var Director = require('./director').Director;
var StartScene = require('./start_scene').StartScene;

var SCREEN_WIDTH = 240;
var SCREEN_HEIGHT = 320;

function main() {
   var director = new Director(SCREEN_WIDTH, SCREEN_HEIGHT);
   var startScene = new StartScene(director);
   
   director.start(startScene);
};

gamejs.preload(['./images/snail.png', './images/background.png', './images/bomb.png']);
gamejs.ready(main);
