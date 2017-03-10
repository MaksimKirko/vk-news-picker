function getNews(tags, count, callback) {
    VK.Api.call('newsfeed.search', {
        q: tags,
        count: 3
    }, function(data) {
        callback(data);
    });
}
