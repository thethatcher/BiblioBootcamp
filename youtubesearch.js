    var query = "cool beans";
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var url2 = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
    var params = {
        part: 'snippet',
        key: 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s',
        q: query
    };
    var videoIds = [];
  
    $.getJSON(url, params, function (searchTerm) {
      console.log(searchTerm);
        for (var i = 0; i < searchTerm.items.length; i++) {
            console.log("https://www.youtube.com/watch?v=" + searchTerm.items[i].id.videoId);
            videoIds.push(searchTerm.items[i].id.videoId);
      }
      for (var j = 0; j < videoIds.length; j++) {
          $.getJSON(url2 + videoIds[j], params, function(response){
            console.log(response);
          })
        }
    });


