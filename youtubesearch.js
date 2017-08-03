    var query = "cool beans";
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s',
        q: query
    };
  
    $.getJSON(url, params, function (searchTerm) {
      console.log(searchTerm);
        for (var i = 0; i < searchTerm.items.length; i++) {
          console.log("https://www.youtube.com/watch?v=" + searchTerm.items[i].id.videoId);        }
    });
