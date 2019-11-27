
//EV DATA BOTH IF E TERNARY OP
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
      // if (starsVote > 0) {
      //   starsHtml += '<i class="fas fa-star yellow"></i>';
      //   starsVote--;
      // } else {
      //   starsHtml += '<i class="fas fa-star black"></i>';
      // }
      starsHtml += (i <= starsVote)   //short version
        ? '<i class="fas fa-star yellow"></i>'
        : '<i class="fas fa-star black"></i>';
    }
    return starsHtml;
  }
  //controllo flag: se lang supportata ritorno stringa per img attr flag corrispondente atrimenti attr not found
  var checkFlag = function (lang) {
    // if (supported_flags.includes(lang)) {
    //   return '<img src="img/flags/' + lang + '.png" alt="flag_img"></img>';
    // } else {   //else si può omettere
    //   return lang;
    // }
    return supported_flags.includes(lang)   //short version
      ? '<img src="img/flags/' + lang + '.png" alt="flag_img"></img>'
      : lang;
  }
  //ritorna url immagine se presente oppure url default se path non esiste(null)
  var checkPosterImg = function (path) {
    // if (path) {
    //   return img_base + img_size + path;
    // }
    // return 'img/empty_path.jpg';
    return path ? img_base + img_size + path : 'img/empty_path.jpg';
  }
  //INIZIO EV DATA
  var printMovies = printMoviesTemp(); // compile handlebars
  //per ogni obj json estraggo titolo, titolo originale, lingua, voto
  for (var i = 0; i < arrObjMov.length; i++) {
    var movObj = arrObjMov[i];
    var lang = movObj.original_language;
    var card = {
      title: movObj.title || movObj.name, //per serie tv key alternativa
      orig_title: movObj.original_title || movObj.original_name,
      lang_flag: checkFlag(lang),
      vote: starRating(movObj.vote_average),
      poster_img: checkPosterImg(movObj.poster_path)
    }
    // console.log('card n°: ', i, '  -  ', card);
    //print video with handlebars
    printMovies(card);
  }

}