const Browser = require('zombie');
//var Promise = require('bluebird');
Browser.localhost('localhost', 3000);

var World = function World() {
    this.browser = new Browser;

    this.visit = (url) => this.browser.visit(url);

    this.fill = (label, value) => {
        return this.browser.fill(label, value);
    };

    this.click = (buttonLabel) => this.browser.pressButton(buttonLabel);

};

module.exports ={ World: World};