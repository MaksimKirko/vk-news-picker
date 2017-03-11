let User = require('../models/user');
const mysql = require('mysql');

class UserDAO {

    getAllUsers(connection, callback) {
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

    getUserById(connection, id, callback) {
        let queryString = 'SELECT * FROM user WHERE id =' + mysql.escape(id);
        connection.query(queryString, function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            else {
                let user = new User(results[0].id, results[0].name);
                callback(err, user);
            }
        });
    }
}

module.exports = new UserDAO();
