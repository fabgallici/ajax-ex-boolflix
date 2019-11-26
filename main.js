// https://docs.google.com/document/d/1-kUoIxQaLIKUPa_JSH-MhlxoLL-RHmHr5Dc1eU8JnPA/edit
// In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.

//SECTION UI: visualizza dati film creando nuovo template handlebars
var printMoviesTemp = function () {
  var source = document.getElementById('movie-template').innerHTML; //compilazione handle esterna per opt
  var movieTemplate = Handlebars.compile(source);

  return function (title, orig_title, lang_flag, vote) {   
    var movieData = { title: title, orig_title: orig_title, lang_flag: lang_flag, vote: vote };
    var htmlMovieData = movieTemplate(movieData);
    $('.mov-container.container').append(htmlMovieData);
  };
};

//SECTION EVDATA: estrazione dati da array di oggetti results e invio dati a video per ogni elemento.
var evMovData = function (arrObjMov) {
  const supported_flags = ['it', 'en', 'fr', 'de', 'es', 'fi', 'be', 'cz', 'jp', 'us'];
  const img_base = "https://image.tmdb.org/t/p/";
  const img_size = "w342";
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
  var checkPosterImg = function (path) {
    if (path) {
      return img_base + img_size + path;
    } else {
      return 'img/empty_path.jpg';
    }
  }
  //INIZIO EV DATA
  var printMovies = printMoviesTemp(); // compile handlebars
  //per ogni obj json estraggo titolo, titolo originale, lingua, voto 
  for (var i = 0; i < arrObjMov.length; i++) {
    var title = arrObjMov[i].title || arrObjMov[i].name;  //per serie tv key alternativa
    var orig_title = arrObjMov[i].original_title || arrObjMov[i].original_name;
    var lang = arrObjMov[i].original_language;
    var vote = arrObjMov[i].vote_average;
    // var poster_img = img_base + img_size + arrObjMov[i].poster_path;
    var poster_img = checkPosterImg(arrObjMov[i].poster_path);
    console.log('title:', title, 'orig_title: ' + orig_title, 'lang ', lang, vote, "poster-img: ", poster_img);
    var lang_flag = checkFlag(lang);   
    printMovies(title, orig_title, lang_flag, starRating(vote));  //print with Handlebars
    //alla card appena creata aggiungo l'img di background se presente;
    $('.mov-container .mov').last().css({'background-image': 'url(' + poster_img + ')'});
    // $('.movies-result').append('<li>' + 'title: ' + title + ' - orig_title: ' + orig_title + ' - lang: ' + lang + ' - vote: ' + vote + '</li>')
  }

}

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
        if (type_src === "movie") { //ad ogni ricerca di movie cancello tutte le ricerche precedenti
          $('.mov-container.container').empty(); 
        }     
        $('#search-input').val(''); //cancellazione campo input dopo ricerca positiva
        evMovData(results);  //elaborazione dati e successivo invio a schermo
      } else {
        console.log('no results found');
      }

    },
    error: function (error) {
      console.log("error: ", error);
    }
  });
};

$(document).ready(function () {

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
      searchMovie(evQueryStr, mov_src);  //invio dati per ricerca film e poi serie tv
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

    //SECTION UI: visualizza dati film creando nuovo template handlebars
// var printMoviesTemp = function (title, orig_title, lang_flag, vote) {
//   var source = document.getElementById('movie-template').innerHTML;
//   var movieTemplate = Handlebars.compile(source);
//   var movieData = { title: title, orig_title: orig_title, lang_flag: lang_flag, vote: vote };
//   var htmlMovieData = movieTemplate(movieData);
//   $('.mov-container.container').append(htmlMovieData);
// };