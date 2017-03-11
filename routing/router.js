const url = require('url');
const routingTable = require('./routingTable');

module.exports = function Routing(req, res, pool) {

    let pUrl = parseUrl(req);

    let routPath = routingTable.routingTable.find(({urlRegExp}) =>
        urlRegExp.test(pUrl.pathname));

    let [{}, ...args] = routPath.urlRegExp.exec(pUrl.pathname);

    routPath.controller(req, res, pool, ...args);
};

function parseUrl(req) {
    try {
        return url.parse(req.url, true);
    } catch (err) {
        return err;
    }
}