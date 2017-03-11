const SendFile = require('../lib/sendfile');
const User = require('../controllers/usercontroller');
const Error404 = require('../controllers/404');

const routingTable = [
    new Map(new RegExp("^/$"), (req, res) => SendFile(req, res, "./views/index.html")),
    new Map(new RegExp("/public/(.*)"), (req, res, pool, fileName) => SendFile(req, res, './public/' + fileName)),
    new Map(new RegExp("^/user"), (req, res, pool) => User(req, res, pool)),
    new Map(new RegExp("^.*$"), (req, res) => Error404(req, res))
];


function Map(urlRegExp, controller) {
    this.urlRegExp = urlRegExp;
    this.controller = controller;
}

module.exports.routingTable = routingTable;
