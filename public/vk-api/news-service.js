function getNews(tags, count, callback) {
    VK.Api.call('newsfeed.search', {
        q: tags,
        count: count
    }, function(data) {
        callback(data);
    });
}

function getNewsText(response) {
    return response.text;
}

const sizeToSrc = {
    75: 'src_small',
    130: 'src',
    604: 'src_big',
    807: 'src_xbig',
    1280: 'src_xxbig',
    2560: 'src_xxxbig'
};

/**
 * @description Get response[i] attachments photos. Size can be 75, 130, 604, 807, 1280, 2560
 * @param {Object} response
 * @param {Number} size
 * @returns {Object} array of news photos
 */
function getNewsPhoto(response, size) {
    var result = [];
    for (var j = 0; j < response.attachments.length; j++) {
        if (response.attachments[j].type == 'photo') {
            result.push(mapSizeToSource(response.attachments[j], size, sizeToSrc));
        }
    }
    return result;
}

function mapSizeToSource(attachment, size, sizeToSrc) {
    return attachment.photo[sizeToSrc[size]];
}
