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
var currentBtn = "w3";

$("#searchForm").submit(function(event){
  event.preventDefault();
  if(currentBtn === "w3"){w3Click();}
  else if(currentBtn === "stack"){stackClick();}
  else if(currentBtn === "google"){googleClick();}
  else if(currentBtn === "youtube"){youtubeClick();}
  $("#spacer").css("height","1px");
});

$(".button").click(function(){
  $(".button").css("filter", "grayscale(0)")
  $(this).css("filter", "grayscale(100%)");
})

$("#W3SearchButton").on("click", function (event) {
  w3Click();
  currentBtn = "w3";
  $("#spacer").css("height","1px");
});

function w3Click(){
  // event.preventDefault();
  console.log("W3 searched");
  $('#empty-div').empty();

  var SearchTerm = $("#search").val().trim();

  console.log ("Search Term: " + SearchTerm);
  database.ref().push({
    "SearchTerm": SearchTerm
    ,"Timestamp": moment().format("DD-Mo-YYYY HH:mm:ss")
    ,"Button_Pushed":"W3-Schools"
  })

//W3 Schools
var queryURL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cr=countryUS&cx=004474692957123199963:djvpgk424qy&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"

  $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
          console.log(response);


          for (var i = 0; i < response.items.length; i++) {

            
          
          var content = "<div class='contentItem'><h3>" + 
          "<a href='" +  response.items[i].formattedUrl+ 
          "'target='_blank'>" + escapeHtmlChars(response.items[i].title) + 
          "</a>" + "</h3>" + "<p>"+ escapeHtmlChars(response.items[i].snippet) + 
          "</p></div>";
          console.log(content);
          $('#empty-div').append(content);
          }

        });
}
	
$("#stackOverflowSearchButton").on("click", function (event) {
  stackClick();
  currentBtn = "stack";
  $("#spacer").css("height","0px");
});

function stackClick(){
  // event.preventDefault();
  console.log("stack searched");
  $('#empty-div').empty();

  var SearchTerm = $("#search").val().trim();

console.log ("Search Term: " + SearchTerm);
//Overstack.com
var query2URL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cr=countryUS&cx=004474692957123199963:zwg44jgvva0&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"
  console.log ("Search Term: " + SearchTerm);
  database.ref().push({
    "SearchTerm": SearchTerm
    ,"Timestamp": moment().format("DD-Mo-YYYY HH:mm:ss")
    ,"Button_Pushed":"StackOverflow"
  })

    $.ajax({
            url: query2URL,
            method: 'GET'
          }).done(function(response2) {
            console.log(response2);

            for (var i = 0; i < response2.items.length; i++) {

              
            
            var content2 = "<div class='contentItem'><h3>" + 
             "<a href='" + response2.items[i].link + 
             "'target='_blank'>"+ escapeHtmlChars(response2.items[i].title) + 
             "</a>"  + "</h1> <p>"+ escapeHtmlChars(response2.items[i].snippet) + 
             "</p></div>";

            $('#empty-div').append(content2);
            }

      });
}

//Google (Exlcuding W3 Schools, Overstack, YouTube)
$("#googleSearchButton").on("click",function(event){
  googleClick();
  currentBtn = "google";  
  $("#spacer").css("height","0px");
});

function googleClick(){
  $("#empty-div").empty();
  var SearchTerm = $("#search").val().trim();

  var query3URL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cr=countryUS&cx=004474692957123199963:jnafc-1ikvc&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"
  database.ref().push({
    "SearchTerm": SearchTerm
    ,"Timestamp": moment().format("DD-Mo-YYYY HH:mm:ss")
    ,"Button_Pushed":"Google"
  })


  console.log ("Search Term: " + SearchTerm);
  $.ajax({
          url: query3URL,
          method: 'GET'
        }).done(function(response3) {
          console.log(response3);

          for (var i = 0; i < response3.items.length; i++) {

            
          
          var content3 = "<div class='contentItem'><h3><a href='" +
           response3.items[i].link + "'target='_blank'>"+
           escapeHtmlChars(response3.items[i].title) + "</a></h1> <p>"+ 
           escapeHtmlChars(response3.items[i].snippet) + "</p></div>";

          $('#empty-div').append(content3);
      }

    });
}

$("#youTubeSearchButton").click(function(){
  youtubeClick();
  currentBtn = "youtube";
  $("#spacer").css("height","0px");
});  

function youtubeClick(){
  console.log("youtube searched");
  query = $("#search").val();
  getYoutubeResults(updateResults);
  database.ref().push({
    "SearchTerm": query
    ,"Timestamp": moment().format("DD-Mo-YYYY HH:mm:ss")
    ,"Button_Pushed":"Youtube"
  });
}

function updateResults(array){
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
    array[i].title + "</a>" + "</h3>" + "<p><span class='views'> Views: </span>" +
     array[i].statistics.viewCount + " <span class='likes'>Likes:  </span>" + array[i].statistics.likeCount + "</p></div>"
     + '<div class="space" style="clear: both;"></div>';
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

function escapeHtmlChars(string){
  for (var i = 0; i < string.length; i++) {
    if(string.charAt(i) === '<'){
      string = string.substr(0,i) + "&lt" + string.substr(i+1,string.length);
    }
    else if(string.charAt(i) === '>'){
      string = string.substr(0,i) + "&gt" + string.substr(i+1,string.length);
    }
    else if(string.charAt(i) === '"'){
      string = string.substr(0,i) + "&quot" + string.substr(i+1,string.length);
    }
    else if(string.charAt(i) === "'"){
      string = string.substr(0,i) + "&apos" + string.substr(i+1,string.length);
    }
  }
  return string;
}