$(document).ready(() => {

    (() => {
    var gameContainer = $('#games-container');
    (() => {
//zobrazeni basic listu videoher
        axios.get('https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b').then(function (response) {
    $.each(response.data.results, function (index, game) {
        gameContainer.append('<p>' + game.name + '</p>');
        var gameImage = game.background_image;
        gameContainer.append(`<img src="${gameImage}" alt="${game.name}" style="width:300px;height:170px;">`);
      });
});

// Funkce tlačítka vyhledávání
function searchGames() {
    // Název z vyhledávacího pole
    var searchTerm = $('#search-field').val();
  
    // Get request k RAWG API
    axios.get(`https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&search=${searchTerm}&search_exact=1&page_size=3`)
    .then(function (response) {
        gameContainer.empty()
        $.each(response.data.results, function (index, game) {
            gameContainer.append('<p>' + game.name + '</p>');
            var gameImage = game.background_image;
            gameContainer.append(`<img src="${gameImage}" alt="${game.name}" style="width:300px;height:170px;">`);
          });
      
    })
    .catch(function (error) {
      // V případě chyby
      console.log(error);
    });
  }

  $('#search-button').click(searchGames);
  

})();
})();
});