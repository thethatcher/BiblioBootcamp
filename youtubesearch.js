    var query = "cool beans";
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
    var params = {
        part: 'snippet',
        key: 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s',
        q: query
        ,maxResults: 3
    };
    var videoIds = [];
    var youtubeVideos = [];
  
    $.getJSON(url, params, function (searchTerm) {
      console.log(searchTerm);
        for (var i = 0; i < searchTerm.items.length; i++) {
            console.log("https://www.youtube.com/watch?v=" + searchTerm.items[i].id.videoId);
            videoIds.push(searchTerm.items[i].id.videoId);
      }
      for (var j = 0; j < videoIds.length; j++) {
          $.getJSON(url2 + videoIds[j], params, function(response){
            console.log(response);
            var stats = response.items[0].statistics;
            youtubeVideos.push(new youtubeVid("test",stats,"test image"));
          })
        }
        console.log(youtubeVideos);
    });

//TODO create our own youtube video object constructor 
//add the data we care about- url, stats, like%

function youtubeVid(link,stats,img){
    this.url = link;
    this.statistics = stats;
    this.thumbnail = img;
    this.statistics.likePercentage = parseInt(this.statistics.likeCount)/(parseInt(this.statistics.likeCount) + parseInt(this.statistics.dislikeCount));
}

