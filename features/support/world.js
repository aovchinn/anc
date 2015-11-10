const Browser = require('zombie');

var baseUrl = "http://anc:3000"

var World = function World() {
    this.browser = new Browser();

    this.visit = (url) => this.browser.visit(`${baseUrl}${url}`);

    this.fill = (label, value) => {
        return this.browser.fill(label, value);
    };

    this.click = (buttonLabel) => this.browser.pressButton(buttonLabel);

};

module.exports ={ World: World};
