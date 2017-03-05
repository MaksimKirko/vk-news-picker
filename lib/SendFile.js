const fs = require('fs');

module.exports = function sendFile(fileName, res) {
    let file = new fs.createReadStream(fileName);
    file.pipe(res);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end();
        console.error(err);
    });

    res.on('load', function () {
        file.destroy();
    })
};