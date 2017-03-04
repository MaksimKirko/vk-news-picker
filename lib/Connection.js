function createConnection(pool, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        callback(err, connection);
    });
}

module.exports = createConnection;