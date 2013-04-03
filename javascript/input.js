var gamejs = require('gamejs');

this.left = false;
this.right = false;

exports.UserControls = function() {
    this.handle = function(event) {
        var down = false;
        if (event.type === gamejs.event.KEY_DOWN)
        {
            down = true;
        }

        switch (event.key) {
            case gamejs.event.K_LEFT:
                this.left = down;
                break;
            case gamejs.event.K_RIGHT:
                this.right = down;
                break;
        }
    }
    
    return this;
};