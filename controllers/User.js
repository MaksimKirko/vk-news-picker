const url = require('url');
const UserDAO = require('../dao/User');
const createConnection = require('../lib/Connection');
const Error404 = require('../controllers/Error404');

module.exports = function getUserById(req, res, pool) {
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