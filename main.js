const http = require('http');
const pool = require('./lib/Pool');
const Routing = require('./routing/router');
const server_property = require('./properties/server_property.json');
const routingTable = require('./routing/routingTable');

const hostname = server_property.host || '127.0.0.1';
const port = server_property.port || 3000;


const server = http.createServer((req, res) => {

    Routing(req, res, pool,routingTable.routingTable);

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
