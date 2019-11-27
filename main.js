// https://docs.google.com/document/d/1-kUoIxQaLIKUPa_JSH-MhlxoLL-RHmHr5Dc1eU8JnPA/edit
// In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.

//SECTION UI: visualizza dati film creando nuovo template handlebars
var printMoviesTemp = function () {
  var source = document.getElementById('movie-template').innerHTML; //compilazione handle esterna per opt
  var movieTemplate = Handlebars.compile(source);

  return function (card) { //ritorna funz per riempire contenuto
    var movieData = card ;
    var htmlMovieData = movieTemplate(movieData);
    $('.mov-container.container').append(htmlMovieData);
  };
};

//SECTION EVDATA: estrazione dati da array di oggetti results e invio dati a video per ogni elemento.
var evMovData = function (arrObjMov) {
  const supported_flags = ['it', 'en', 'fr', 'de', 'es', 'fi', 'be', 'cz', 'ja', 'us'];
  const img_base = "https://image.tmdb.org/t/p/";
  const img_size = "w342";
  //transformo vote in num intero da 1 a 5, creando una stringa con relative stelle fontawesome colorate e restanti vuote.
  var starRating = function (vote) {
    const voteNumBase = 10;
    const maxStars = 5;
    var starsHtml = "";
    var starsVote = Math.floor((vote * maxStars) / voteNumBase);
    for (var i = 1; i <= maxStars; i++) {
      starsHtml += (i <= starsVote)   //short version
        ? '<i class="fas fa-star yellow"></i>'
        : '<i class="fas fa-star black"></i>';
    }
    return starsHtml;
  }
  //controllo flag: se lang supportata ritorno stringa per img attr flag corrispondente atrimenti attr not found
  var checkFlag = function (lang) {
    return supported_flags.includes(lang)   //short version
      ? '<img src="img/flags/' + lang + '.png" alt="flag_img"></img>'
      : lang;
  }
  //ritorna url immagine se presente oppure url default se path non esiste(null)
  var checkPosterImg = function (path) {
    return path ? img_base + img_size + path : 'img/empty_path.jpg';
  }
  //INIZIO EV DATA
  var printMovies = printMoviesTemp(); // compile handlebars
  //per ogni obj json estraggo titolo, titolo originale, lingua, voto 
  for (var i = 0; i < arrObjMov.length; i++) {
    var movObj = arrObjMov[i];
    var lang = movObj.original_language;
    var card = {
      title : movObj.title || movObj.name, //per serie tv key alternativa
      orig_title : movObj.original_title || movObj.original_name,
      lang_flag : checkFlag(lang),  
      vote : starRating(movObj.vote_average),       
      poster_img : checkPosterImg(movObj.poster_path)
    }
    // console.log('card n°: ', i, '  -  ', card);
    //print video with handlebars
    printMovies(card);
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
        if (type_src === "movie") { //ad ogni ricerca positiva di movie cancello tutte le ricerche precedenti
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
