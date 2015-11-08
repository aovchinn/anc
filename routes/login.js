/**
 * Created by alexzander on 11/2/15.
 */
var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('login', {title: 'Welcome', alertMessages: req.flash('error')});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;