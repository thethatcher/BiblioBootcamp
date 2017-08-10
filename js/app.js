// Initialize Firebase
var config = {
apiKey: "AIzaSyBMx99hwg0NjmMAG3CkdqDOrOZqU1stosA",
authDomain: "groupproject1-dbe33.firebaseapp.com",
databaseURL: "https://groupproject1-dbe33.firebaseio.com",
projectId: "groupproject1-dbe33",
storageBucket: "",
messagingSenderId: "935455613863"
};
firebase.initializeApp(config);
database = firebase.database();

var query = "Jquery getJSON";

$("#youTubeSearchButton").click(function(){
	query = $("#search").val();
	getYoutubeResults(popDom);
	database.ref().push({
		"SearchTerm": query
		,"Timestamp": moment().format("DD-Mo-YYYY HH:mm:ss")
		,"Button_Pushed":"Youtube"
	})
	
});  

function popDom(array){
	//TODO create DOM elements  and populate results.
	$("#empty-div").empty(); 
	//filter bad results
	for (var i = 0; i < array.length; i++) {
		if (array[i].likePercentage < .9 && array[i].statistics.viewCount < 2000) {
			array.splice(i,1);
		}
	}
	//use a for loop to create div results
	for (var i = 0; i < array.length; i++) {
		var youtubeContent = "<div class='contentItem'><h3>" + 
		"<a href=" + array[i].url+" target='_blank'>" + 
		"<img src='" + array[i].thumbnail + "' class='thumbnail'>" +
		array[i].title + "</a>" + "</h3>" + "<p> Views: " +
		 array[i].statistics.viewCount + "         likes:  " + array[i].statistics.likeCount + "</p></div>"
		 + '<div class="spacer" style="clear: both;"></div>';
		 $("#empty-div").append(youtubeContent);
	}

}

function getYoutubeResults(callback){

	var url = 'https://www.googleapis.com/youtube/v3/search';
	var url2 = 'https://www.googleapis.com/youtube/v3/videos';
	var params = {
	    part: 'snippet',
	    key: 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s',
	    q: query,
	    maxResults: 5
	};
	var idString = "";
	var youtubeVideos = [];

	$.getJSON(url, params, function (searchTerm) {
	  console.log(searchTerm);
	    for (var i = 0; i < searchTerm.items.length; i++) {
	        idString += (searchTerm.items[i].id.videoId + ",");        
	    }
	    getStatistics();
	});

	function getStatistics(){
	    idString = idString.substring(0,idString.length - 1);
	    console.log("idString: " + idString);
	    var paramVids = {
	        "id" : idString
	        ,"part" : "snippet,contentDetails,statistics"
	        , "key": 'AIzaSyCYGQsuv0YLyrE4N11eXj52gBvsnfJ5v9s'
	    };
	    console.log("getStatistics called");
	    $.getJSON(url2, paramVids, function(response){
	        console.log("response: ", response);
	        for (var i = 0; i < response.items.length; i++) {
	            var tempVideo = new youtubeVid();
	            tempVideo.id = response.items[i].id;
	            tempVideo.url = "https://www.youtube.com/watch?v=" + tempVideo.id;
	            tempVideo.thumbnail = response.items[i].snippet.thumbnails.medium.url;
	            tempVideo.description = response.items[i].snippet.description;
	            tempVideo.statistics = response.items[i].statistics;
	            tempVideo.likePercentage = parseInt(tempVideo.statistics.likeCount) / (parseInt(tempVideo.statistics.likeCount) + parseInt(tempVideo.statistics.dislikeCount));
	            tempVideo.title = response.items[i].snippet.title;
	            youtubeVideos.push(tempVideo);
	        }
	        callback(youtubeVideos);
	    });
	}

	function youtubeVid(){
	    this.likePercentage ;
	    this.statistics ;
	    this.id ;
	    this.url ;
	    this.thumbnail ;
	    this.description ;
	    this.title;
	}
}
