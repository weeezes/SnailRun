var gamejs = require('gamejs');

var Director = function(width, height) {
    this.onAir = false;
    this.activeScene = null;
    
    this.width = width;
    this.height = height;
    
    this.display = gamejs.display.setMode([this.width, this.height]);
    
    gamejs.time.fpsCallback(this.tick, this, 60);
    
    this.scenes = new Array();
    
    return this;
};

    
Director.prototype.tick = function(msDuration) {
    if (!this.onAir) return;
    
    if (this.activeScene.handleEvent) {
        var events = gamejs.event.get();
        for (var i = 0; i < events.length; i++) {
            this.activeScene.handleEvent(events[i]);
        }
    } else {
        // throw all events away
        gamejs.event.get();
    }
    
    if (this.activeScene.update) {
        this.activeScene.update(msDuration);
    }
    
    if (this.activeScene.draw) {
        this.activeScene.draw(this.display);
    }
    
    return;
};

Director.prototype.start = function(scene) {
    this.onAir = true;
    this.pushScene(scene);
};

Director.prototype.replaceScene = function(scene) {
    this.activeScene = scene;
};

Director.prototype.pushScene = function(scene) {
    this.scenes.push(scene);
    this.replaceScene(scene);
};

Director.prototype.popScene = function() {
    this.scenes.pop();
    this.replaceScene(this.scenes[this.scenes.length-1]);
};

Director.prototype.toBeginning = function() {
    this.scenes = new Array(this.scenes[0]);
    this.replaceScene(this.scenes[0]);
}
Director.prototype.getScene = function() {
    return this.activeScene;
};

exports.Director = Director;