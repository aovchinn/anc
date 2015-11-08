var crypto = require('crypto');

var records = [
    {
        id: 1,
        username: 'jack',
        displayName: 'Jack',
        email: 'jack@example.com',
        hash: '5ebe2294ecd0e0f08eab7690d2a6ee69'
    }
    , {
        id: 2,
        username: 'jill',
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
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.email === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
};

exports.add = function (){

};
