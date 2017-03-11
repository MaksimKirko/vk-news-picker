const http = require('http');
const server_property = require('./properties/server_property.json');
const Error404 = require('./controllers/Error404');
const Routing = require('./routing/router');
const pool = require('./lib/Pool');
const hostname = server_property.host || '127.0.0.1';
const port = server_property.port || 3000;

/*Вопросики:
 1. Какой config юзать?
 */
const server = http.createServer((req, res) => {

    Routing(req, res, pool);

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
