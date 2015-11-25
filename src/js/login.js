var riot = require('riot');
var loginTag = require('../../riot_views/loginForm.tag');
var initialState = require('./redux/login').getState();

riot.mount(loginTag, initialState);
