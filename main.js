$(document).ready(function () {
  console.log('prova');
  $('#search-btn').on('click', function() {
    console.log('click');
    var searchStr = $('#search-input').val();
    console.log(searchStr);
  })






});





// https://api.themoviedb.org/3/search/movie?api_key=6dd01b7265c335fd46cc94907c9fefc1&query=ritorno+al+futuro