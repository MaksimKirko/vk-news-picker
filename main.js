const http = require('http');
const fs = require('fs');
const url = require('url');
const pool = require('./lib/Pool');
const getAllUsers = require('./dao/User');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
        let parseUrl;
        try {
            parseUrl = url.parse(req.url);
        } catch (err) {
            console.error(err);
        }
        switch (parseUrl.pathname) {
            case '/':
                let file = new fs.createReadStream('./views/index.html');
                sendFile(file, res);
                break;
            case '/users':
                getAllUsers(pool, function (err, users) {
                    for (let i = 0; i < users.length; i++)
                        res.write("ID = " + users[i].id + "\nName = "+ users[i].name + "\n\n");
                    res.end();
                });
                break;
            default:
                res.statusCode = 404;
                res.end();
                break;
        }
    })
    ;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function sendFile(file, res) {
    file.pipe(res);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end();
        console.error(err);
    });

    res.on('close', function () {
        file.destroy();
    })
}