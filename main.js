const http = require('http');

const pool = require('./lib/pool');
const server_property = require('./properties/server_property.json');
const Error404 = require('./controllers/404');
const Routing = require('./routing/router');

const hostname = server_property.host || '127.0.0.1';
const port = server_property.port || 80;

const server = http.createServer((req, res) => {
    Routing(req, res, pool);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
