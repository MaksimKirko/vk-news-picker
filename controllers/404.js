const sendFile = require('../lib/SendFile');

module.exports = function Error404(res) {
    res.statusCode = 404;
    sendFile('./views/404.html', res);
};