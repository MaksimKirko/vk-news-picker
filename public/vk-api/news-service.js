class NewsItem {
    constructor(text, likes, date, ownerId, photos, videos) {
        this.text = text;
        this.likes = likes;
        this.date = date;
        this.ownerId = ownerId;
        this.photos = photos;
        this.videos = videos;
    }

    test() {
        console.log(this.text);
    }
}

const imageSizeToSrc = {
    75: 'src_small',
    130: 'src',
    604: 'src_big',
    807: 'src_xbig',
    1280: 'src_xxbig',
    2560: 'src_xxxbig'
};

const videoSizeToSrc = {
    160: 'image',
    320: 'image_medium'
};

function getNews(tags, count, callback) {
    VK.Api.call('newsfeed.search', {
        q: tags,
        count: count,
        max_photos: 100,
        extended: 1
    }, function(data) {
        callback(data);
    });
}

function filterGroupsNews(response) {
    var filterableResponse = [];
    for (i = 0; i < response.length; i++) {
        if (response[i].text != null) {
            var ownerId = getNewsOwnerId(response[i]).toString();
            if (ownerId.startsWith("-")) {
                filterableResponse.push(response[i]);
            }
        }
    }
    return filterableResponse;
}

/**
* You should to send response[i]
*/
function getNewsItem(response, photoSize) {
    var text = getNewsText(response);
    var likes = getLikesCount(response);
    var date = getNewsDate(response);
    var ownerId = getNewsOwnerId(response);
    var photos = getNewsPhotos(response, photoSize);
    var videos = getNewsVideos(response);
    let item = new NewsItem(text, likes, date, ownerId, photos, videos);
    return item;
}

function getNewsText(response) {
    return response.text;
}

function getLikesCount(response) {
  return response.likes.count;
}

function getNewsDate(response) {
    return response.date;
}

function getNewsOwnerId(response) {
    return response.owner_id;
}

/**
 * @description Get response[i] attachments photos. Size can be 75, 130, 604, 807, 1280, 2560
 * @param {Object} response
 * @param {Number} size
 * @returns {Object} array of news photos
 */
function getNewsPhotos(response, size) {
    var result = [];
    for (var j = 0; j < response.attachments.length; j++) {
        if (response.attachments[j].type == 'photo') {
            result.push(mapImageSizeToSource(response.attachments[j], size));
        }
    }
    return result;
}

function mapImageSizeToSource(attachment, size) {
    return attachment.photo[imageSizeToSrc[size]];
}

/**
 * @description Get response[i] attachments videos. Size can be 130, 320, 640, 800
 * @param {Object} response
 * @param {Number} size
 * @returns {Object} array of news videos
 */
function getNewsVideos(response) {
  var result = [];
  for (var j = 0; j < response.attachments.length; j++) {
      if (response.attachments[j].type == 'video') {
          result.push(response.attachments[j].video);
      }
  }
  return result;
}

function mapVideoSizeToSource(video, size) {
    return video[videoSizeToSrc[size]];
}

function getVideoPoster(video, size) {
  return mapVideoSizeToSource(video, size);
}

function getVideoPlayer(video) {
    return video.player;
}
