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
            var tempVideo = new youtubeVid();

            tempVideo.url = "https://www.youtube.com/watch?v=" + searchTerm.items[i].id.videoId;
            tempVideo.id = searchTerm.items[i].id.videoId;
            tempVideo.thumbnail = searchTerm.items[i].snippet.thumbnails.medium.url;
            tempVideo.description = searchTerm.items[i].snippet.description;
            

            $.getJSON(url2 + tempVideo.id, params, function(response){
                // console.log("response: ", response);
                tempVideo.statistics = response.items[0].statistics;
                tempVideo.likePercentage = parseInt(tempVideo.statistics.likeCount) / (parseInt(tempVideo.statistics.likeCount) + parseInt(tempVideo.statistics.dislikeCount));
                console.log("tempVideo: ", tempVideo);
                youtubeVideos.push(tempVideo);
            });
            
        }
        console.log(youtubeVideos);
    });

for (var i = 0; i < youtubeVideos.length; i++) {
    
}

    

    

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
