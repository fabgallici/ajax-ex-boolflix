$(document).ready(function () {

  const apiKey = "6dd01b7265c335fd46cc94907c9fefc1";

  var searchMovie = function(queryStr) {
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: apiKey,
        query: queryStr  //comment debug error:
      },
      success: function (data) {
        var results = data.results;
        console.log(results);
      },
      error: function (error) {
        console.log("error: ", error);
      }
    });
  }


  console.log('prova');
  $('#search-btn').on('click', function() {
    // console.log('click');
    var queryStr = $('#search-input').val();
    // console.log(queryStr);
    searchMovie(queryStr);
  })






});





// https://api.themoviedb.org/3/search/movie?api_key=6dd01b7265c335fd46cc94907c9fefc1&query=ritorno+al+futuro