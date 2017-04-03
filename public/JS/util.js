function getTimeFromTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

function printNews(response) {
    for (i = 0; i < response.length; i++) {
        if (response[i].text != null) {
            var item = getNewsItem(response[i], 604);
            document.getElementById('news_container').innerHTML +=
                "<br> News №" + i + "<br>" +
                item.text +
                "<br>";
            document.getElementById('news_container').innerHTML +=
                "<br> Owner id=" +
                item.ownerId +
                "<br>";
            document.getElementById('news_container').innerHTML +=
                "<br> Time =" +
                getTimeFromTimestamp(item.date) +
                "<br>";
            if (response[i].attachments != undefined) {
                for (var j = 0; j < item.photos.length; j++) {
                    document.getElementById('news_container').innerHTML +=
                        '<img src="' + item.photos[j] + '">';
                }
                for (var j = 0; j < item.videos.length; j++) {
                    document.getElementById('news_container').innerHTML +=
                        '<video width="640" height="480" controls="controls" poster="' + getVideoPoster(item.videos[j], 320) + '"> <source src="'
                        + getVideoPlayer(item.videos[j]) + '"></video>';
                }
            }
        }
    }
}
