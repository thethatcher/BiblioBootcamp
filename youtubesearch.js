    var query = "cool beans";
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
    var params = {
        part: 'snippet',
        key: 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s',
        q: query
        ,maxResults: 3
    };

    var youtubeVideos = [];
  
    $.getJSON(url, params, function (searchTerm) {
      console.log(searchTerm);
        for (var i = 0; i < searchTerm.items.length; i++) {
            youtubeVideos.push(new youtubeVid());

            youtubeVideos[i].url = "https://www.youtube.com/watch?v=" + searchTerm.items[i].id.videoId;
            youtubeVideos[i].id = searchTerm.items[i].id.videoId;
            youtubeVideos[i].thumbnail = searchTerm.items[i].snippet.thumbnails.medium.url;
            youtubeVideos[i].description = searchTerm.items[i].snippet.description;
            console.log("object: ", youtubeVideos[i]);

            //calling youtube API to get specific video statistics
            $.getJSON(url2 + youtubeVideos[i].id, params, function(response){
                console.log("response: ", response);
                // youtubeVideos[i].statistics = response.items[0].statistics;
                // youtubeVideos[i].likePercentage = parseInt(youtubeVideos[i].statistics.likeCount) / (parseInt(youtubeVideos[i].statistics.likeCount) + parseInt(youtubeVideos[i].statistics.dislikeCount));
            });
        }

        console.log(youtubeVideos);
    });

    

    

//TODO create our own youtube video object constructor 
//add the data we care about- url, stats, like%

function youtubeVid(){
    this.id ;
    this.url ;
    this.thumbnail ;
    this.description ;
    this.statistics ;
    this.likePercentage ;
    
}
