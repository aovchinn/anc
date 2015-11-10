module.exports = function (){
    this.World = require('../support/world.js').World;
    this.Given(/^I am on '(.*)' page$/, function (url) {
        return this.visit(url);
    });

    this.When(/^I fill '(.*)' in '(.*)' field$/, function (value, field) {
        return this.fill(field, value);
    });

    this.When(/^I press '(.*)' button$/, function (label) {
        return this.click(label);
    });

    this.Then(/^I should be redirected to '(.*)'$/, function (url) {
        this.browser.assert.url(url);
    });

    this.Then(/^I should see alert '(.*)'$/, function (alertMessage){
        this.browser.assert.text('.alert.alert-danger', alertMessage);
    });
};
