$(document).ready(function () {

  const apiKey = "6dd01b7265c335fd46cc94907c9fefc1";

  var searchMovie = function (queryStr) {
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
        evMovData(results);
      },
      error: function (error) {
        console.log("error: ", error);
      }
    });
  };

  var evMovData = function (arrObjMov) {
    for (var i = 0; i < arrObjMov.length; i++) {
      var title = arrObjMov[i].title;
      var orig_title = arrObjMov[i].original_title;
      var lang = arrObjMov[i].original_language;
      var vote = arrObjMov[i].vote_average;
      console.log(title, orig_title, lang, vote);
      // printMoviesTemp(title, orig_title, lang, vote);
      $('.movies-result').append('<li>' + 'title: ' + title + ' - orig_title: ' + orig_title + ' - lang: ' + lang + ' - vote: ' + vote + '</li>')
    }

  }

  var printMoviesTemp = function (objMov) {

  };


  console.log('prova');
  $('#search-btn').on('click', function () {
    // console.log('click');
    var queryStr = $('#search-input').val();
    // console.log(queryStr);
    searchMovie(queryStr);
  })






});





// https://api.themoviedb.org/3/search/movie?api_key=6dd01b7265c335fd46cc94907c9fefc1&query=ritorno+al+futuro