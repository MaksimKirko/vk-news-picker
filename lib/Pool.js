const mysql = require('mysql');
const db_property = require('./../properties/db_property.json');

let pool = mysql.createPool({
    connectionLimit: db_property.connectionLimit,
    host: db_property.host,
    port: db_property.port,
    user: db_property.user,
    password: db_property.password,
    database: db_property.database,
    debug: db_property.debug
});

module.exports = pool;