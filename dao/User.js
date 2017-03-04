let User = require('../models/User');

function getAllUsers(connection, callback) {
    let users = [];
    connection.query("select * from user", function (err, results, fields) {
        if (err) {
            return callback(err);
        }
        for (let i = 0; i < results.length; i++) {
            users[i] = new User(results[i].id, results[i].name);
        }
        callback(err, users);
    });
}

module.exports = getAllUsers;