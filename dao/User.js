let User = require('../models/User');

function getAllUsers(pool, callback) {
    let users = [];
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query("select * from user", function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            connection.release();
            for (let i = 0; i < results.length; i++) {
                users[i] = new User(results[i].id, results[i].name);
            }
            callback(err, users);
        });
    });
}

module.exports = getAllUsers;