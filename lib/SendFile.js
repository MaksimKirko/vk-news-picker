const fs = require('fs');

module.exports = function sendFile(req, res, fileName) {
    let file = new fs.createReadStream(fileName);

    file.pipe(res).on('error', function (err) {
        res.statusCode = 500;
        res.end();
        console.error(err);
    });

    res.on('load', function () {
        file.destroy();
    })
};
