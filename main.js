const http = require('http');
const url = require('url');
const pool = require('./lib/Pool');
const UserDAO = require('./dao/User');
const createConnection = require('./lib/Connection');
const server_property = require('./properties/server_property.json');
const sendFile = require('./lib/SendFile');

const hostname = server_property.host || '127.0.0.1';
const port = server_property.port || 3000;


/*Вопросики:
 1. Какой config юзать?
 */
const server = http.createServer((req, res) => {
    //Url Parsing
    let parseUrl;
    try {
        parseUrl = url.parse(req.url, true);
    } catch (err) {
        console.error(err);
    }

    //Static Files
    if (parseUrl.pathname.toString().startsWith('/public/')) {
        sendFile('.' + parseUrl.pathname, res);
        return;
    }

    //Navigation
    switch (parseUrl.pathname) {
        case '/':
            sendFile('./views/index.html', res);
            break;
        case '/user':
            createConnection(pool, function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                } else {
                    UserDAO.getUserById(connection, parseUrl.query.id, function (err, user) {
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
            break;
        case '/users':
            createConnection(pool, function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                } else {
                    UserDAO.getAllUsers(connection, function (err, users) {
                        connection.release();
                        for (let i = 0; i < users.length; i++)
                            res.write("ID = " + users[i].id + "\nName = " + users[i].name + "\n\n");
                        res.end();
                    });
                }
            });
            break;
        default:
            Error404(res);
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function Error404(res) {
    res.statusCode = 404;
    sendFile('./views/404.html', res);
}