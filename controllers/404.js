const sendFile = require('../lib/SendFile');

module.exports = function Error404(req, res) {
    res.statusCode = 404;
    sendFile(req, res, './views/404.html');
};