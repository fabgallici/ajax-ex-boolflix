$(document).ready(function () {

  const apiKey = "6dd01b7265c335fd46cc94907c9fefc1";
  const lang_It = "it-IT";

  var searchMovie = function (queryStr) {
    console.log('queryStr', queryStr);
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: apiKey,
        query: queryStr,
        language: lang_It
      },
      success: function (data) {
        var results = data.results;
        console.log(results);
        if (results.length > 0) {
          evMovData(results);
        } else {
          console.log('no results found');
        }
        
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
      printMoviesTemp(title, orig_title, lang, vote);
      // $('.movies-result').append('<li>' + 'title: ' + title + ' - orig_title: ' + orig_title + ' - lang: ' + lang + ' - vote: ' + vote + '</li>')
    }

  }

  var printMoviesTemp = function (title, orig_title, lang, vote) {
    var source = document.getElementById('movie-template').innerHTML;
    var movieTemplate = Handlebars.compile(source);
    var movieData = { title: title, orig_title: orig_title, lang: lang, vote: vote };
    var htmlMovieData = movieTemplate(movieData);
    $('.mov-container.container').append(htmlMovieData);
  };

  var evSearchData = function (str) {
    var arr = str.toLowerCase().split(' ');
    var newStr = arr.join('+');
    return newStr;
  }
  
  //init program
  //get input section
  var getInputData = function() {
    $('#search-btn').on('click', function () {
      // console.log('click');
      var queryStr = $('#search-input').val();
      console.log('queryStr', queryStr);
      var evQueryStr = evSearchData(queryStr);
      searchMovie(evQueryStr);
    })
  }

  getInputData();






});





// https://api.themoviedb.org/3/search/movie?api_key=6dd01b7265c335fd46cc94907c9fefc1&query=ritorno+al+futuro