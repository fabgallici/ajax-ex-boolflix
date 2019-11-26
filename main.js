$(document).ready(function () {


  //SECTION Ajax call ricerca query
  var searchMovie = function (queryStr, type_src) {
    const apiKey = "6dd01b7265c335fd46cc94907c9fefc1";
    const lang_It = "it-IT";
    // console.log('queryStr', queryStr);
    $.ajax({
      url: "https://api.themoviedb.org/3/search/" + type_src,
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
          $('#search-input').val('');
          evMovData(results);  //elaborazione dati
        } else {
          console.log('no results found');
        }

      },
      error: function (error) {
        console.log("error: ", error);
      }
    });
  };

  //SECTION EVDATA: estrazione dati da array di oggetti results e invio dati a video per ogni elemento.
  var evMovData = function (arrObjMov) {
    const supported_flags = ['it', 'en', 'fr', 'de', 'es', 'fi', 'be', 'cz', 'jp', 'us'];
    //transformo vote in num intero da 1 a 5, creando una stringa con relative stelle fontawesome colorate e restanti vuote.
    var starRating = function (vote) {
      const voteNumBase = 10;
      const maxStars = 5;
      var starsHtml = "";
      var starsVote = parseInt((vote * maxStars) / voteNumBase);
      for (var i = 1; i <= maxStars; i++) {
        if (starsVote > 0) {
          starsHtml += '<i class="fas fa-star yellow"></i>';
          starsVote--;
        } else {
          starsHtml += '<i class="fas fa-star black"></i>';
        }
      }
      return starsHtml;
    }
    //controllo flag: se lang supportata ritorno stringa per img attr flag corrispondente atrimenti attr not found
    var checkFlag = function (lang) {
      if (supported_flags.includes(lang)) {
        return '<img src="img/flags/' + lang + '.png" alt="flag_img"></img>';
      } else {
        return lang;
      }
    }
    //INIZIO EV DATA
    //clear container per nuova ricerva
    $('.mov-container.container').empty();
    //per ogni obj json estraggo titolo, titolo originale, lingua, voto
    for (var i = 0; i < arrObjMov.length; i++) {
      var title = arrObjMov[i].title || arrObjMov[i].name;
      var orig_title = arrObjMov[i].original_title || arrObjMov[i].original_name;
      var lang = arrObjMov[i].original_language;
      var vote = arrObjMov[i].vote_average;
      console.log('title:', title,'orig_title: ' +  orig_title,'lang ',  lang, vote);
      var lang_flag = checkFlag(lang);
      printMoviesTemp(title, orig_title, lang_flag, starRating(vote));
      // $('.movies-result').append('<li>' + 'title: ' + title + ' - orig_title: ' + orig_title + ' - lang: ' + lang + ' - vote: ' + vote + '</li>')
    }

  }

  //SECTION UI: visualizza dati film creando nuovo template handlebars
  var printMoviesTemp = function (title, orig_title, lang_flag, vote) {
    var source = document.getElementById('movie-template').innerHTML;
    var movieTemplate = Handlebars.compile(source);
    var movieData = { title: title, orig_title: orig_title, lang_flag: lang_flag, vote: vote };
    var htmlMovieData = movieTemplate(movieData);
    $('.mov-container.container').append(htmlMovieData);
  };

  //SECTION controller: get input and start program
  var controller = function () {
    var mov_src = "movie";
    var tv_src = "tv";
    //concatenazione stringa con +
    var evInput = function (str) {
      var arr = str.toLowerCase().split(' ');
      var newStr = arr.join('+');
      return newStr;
    }
    //get input field, call convert string, call searchMovie
    var getInputAndSearch = function () {
      var queryStr = $('#search-input').val();
      var evQueryStr = evInput(queryStr);
      searchMovie(evQueryStr, mov_src);
      searchMovie(evQueryStr, tv_src);
    }
    $('#search-btn').on('click', getInputAndSearch);

    $('#search-input').keypress(function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        getInputAndSearch();
      }
    })

  }
  //init program
  
  controller();


});






// https://api.themoviedb.org/3/search/movie?api_key=6dd01b7265c335fd46cc94907c9fefc1&query=ritorno+al+futuro

    //gestione errore lang flag img not found da rivedere
    // $('.mov img').on('error', function () {
    //   console.log('img error');
    //   $(this).siblings('.mov-lang').addClass('show-text');
    // })

        //non funziona con delegation, con click al posto di error funziona 
    // $('.mov-container').on('error', 'img', function() {
    //   console.log('img error');
    //   // $(this).closest('.mov-lang').html('test');
    // })