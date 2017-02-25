const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let parseUrl = url.parse(req.url);

    switch (parseUrl.pathname) {
        case '/':
            let file = new fs.createReadStream('./www/index.html');
            sendFile(file,res);
            break;
        case '/feed':
            res.end('FEED!');
            break;
        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function sendFile(file,res) {
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