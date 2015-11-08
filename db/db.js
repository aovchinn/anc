var crypto = require('crypto');

var records = [
    {
        id: 1,
        username: 'jack',
        password: 'secret',
        displayName: 'Jack',
        email: 'jack@example.com',
        hash: 'ee5770a649fccbde3e448d90591673ca'
    }
    , {
        id: 2,
        username: 'jill',
        password: 'birthday',
        displayName: 'Jill',
        email: 'jill@example.com',
        hash: ''
    }
];

exports.findById = function (id, cb) {
    process.nextTick(function () {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
};

exports.findOne = function (username, cb) {
    process.nextTick(function () {
        var hash = crypto.createHash('md5');
        hash.update(username);
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.hash === hash.digest('hex')) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
};

