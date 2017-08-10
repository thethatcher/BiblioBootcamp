$("#W3SearchButton").on("click", function (event) {

// event.preventDefault();

$('#empty-div').empty();

var SearchTerm = $("#search").val().trim();

console.log ("Search Term: " + SearchTerm);


//W3 Schools
var queryURL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cx=004474692957123199963:djvpgk424qy&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"

  $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
          console.log(response);


          for (var i = 0; i < response.items.length; i++) {

          	
          
          var content = "<div class='contentItem'><h3>" + "<a href='" + response.items[i].formattedUrl+"'target='_blank'>" + response.items[i].title + "</a>" + "</h3>" + "<p>"+ response.items[i].snippet + "</p></div>";
          console.log(content);
          $('#empty-div').append(content);
      		}

    });
    });
	
$("#stackOverflowSearchButton").on("click", function (event) {

// event.preventDefault();

$('#empty-div').empty();

var SearchTerm = $("#search").val().trim();

console.log ("Search Term: " + SearchTerm);

//Stackoverflow
var query2URL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cx=004474692957123199963:zwg44jgvva0&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"

  $.ajax({
          url: query2URL,
          method: 'GET'
        }).done(function(response2) {
          console.log(response2);

          for (var i = 0; i < response2.items.length; i++) {

          	
          
          var content2 = "<div class='contentItem'><h3>" +  "<a href='" + response2.items[i].link + "'target='_blank'>"+ response2.items[i].title+ "</a>"  + "</h1> <p>"+ response2.items[i].snippet + "</p></div>";

          $('#empty-div').append(content2);
      		}

    });
});

//Google (Exlcuding W3 Schools, Overstack, YouTube)
$("#googleSearchButton").on("click",function(event){

  $("#empty-div").empty();

  var query3URL="https://www.googleapis.com/customsearch/v1?q="+SearchTerm+"&cx=004474692957123199963:jnafc-1ikvc&key=AIzaSyAXET23jWz1E-N-JeBJ-3rGq8oqQ-Cy9gc"
  var SearchTerm = $("#search").val().trim();

  console.log ("Search Term: " + SearchTerm);
  $.ajax({
          url: query3URL,
          method: 'GET'
        }).done(function(response3) {
          console.log(response3);

          for (var i = 0; i < response3.items.length; i++) {

          	
          
          var content3 = "<div class='contentItem'><h3>" +  "<a href='" + response3.items[i].link + "'target='_blank'>"+ response3.items[i].title+ "</a>"  + "</h1> <p>"+ response3.items[i].snippet + "</p></div>";

          $('#empty-div').append(content3);
      }

    });
});











      

      