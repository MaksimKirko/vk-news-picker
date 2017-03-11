const url = require('url');
const UserDAO = require('../dao/User');
const createConnection = require('../lib/Connection');
const Error404 = require('../controllers/Error404');

class UserController {

    getUserById(req, res, pool) {
        createConnection(pool, function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
            } else {
                UserDAO.getUserById(connection, url.parse(req.url, true).query.id, function (err, user) {
                    if (err || user === null) {
                        console.error(err !== null ? err : "");
                        connection.release();
                        Error404(res);
                    } else {
                        connection.release();
                        res.end("ID = " + user.id + "\nName = " + user.name);
                    }
                });
            }
        });
    };

    getAllUsers(req, res, pool) {
        createConnection(pool, function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
            } else {
                UserDAO.getAllUsers(connection, function (err, users) {
                    if (err || users === null) {
                        console.error(err !== null ? err : "");
                        connection.release();
                        Error404(res);
                    } else {
                        connection.release();
                        users.forEach(function (user) {
                            res.write("ID = " + user.id + "\nName = " + user.name + "\n");
                        });
                        res.end();
                    }
                });
            }
        });

    };
}


module.exports = new UserController();