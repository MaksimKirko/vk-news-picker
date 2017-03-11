function getNews(tags, count, callback) {
    VK.Api.call('newsfeed.search', {
        q: tags,
        count: count
    }, function(data) {
        callback(data);
    });
}
