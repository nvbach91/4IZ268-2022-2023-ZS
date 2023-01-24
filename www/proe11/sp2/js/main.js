$(document).ready(() => {
  var randomGamesContainer = $('#random-games-container');
  var userGamesContainer = $('#user-games-container');
  var emptyText = $('<p>').addClass('empty-text').text('Seznam videoher je prázdný.');

  var spinner = $('<div>').addClass('spinner');
  randomGamesContainer.append(spinner);
  spinner.show();

  // Nahrání základních her z RAWG
  axios.get('https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&page_size=25').then(function (response) {
    $.each(response.data.results, function (index, game) {
      var gameName = game.name;
      var gameImage = game.background_image;
      var gameSlug = game.slug;
      var gameElement = $('<p>').addClass('game-item').text(gameName);
      gameElement.append(`<img src="${gameImage}" alt="${gameSlug}" style="width:300px;height:170px;">`);
      var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
      gameElement.append(addButton);
      randomGamesContainer.append(gameElement);
      spinner.hide();
    });
  });

  // Nahrání uživatelských her z localStorage
  var userGames = JSON.parse(localStorage.getItem('userGames')) || [];
  if (userGames.length == 0) {
    // Přidání textu do userGamesContaineru pokud je localStorage prázdná
    userGamesContainer.append(emptyText);
  } else {
    // Pokud není, přidají se dané herní elementy na stránku
    $.each(userGames, function (index, game) {
      var gameName = game.name;
      var gameImage = game.image;
      var gameElement = $('<p>').addClass('user-game-item').text(gameName);
      gameElement.append(`<img src="${gameImage}" alt="${gameName}" style="width:300px;height:170px;">`);
      var removeButton = $('<button>').addClass('remove-button').text('Odebrat ze seznamu');
      gameElement.append(removeButton);
      userGamesContainer.append(gameElement);
    });
  }

  //Tlačítko přidání vybrané hry na seznam uživatelských her
  $(document).on('click', '.add-button', function () {
    var gameName = $(this).parent().text().replace("Přidat na seznam", "");
    var gameImage = $(this).prev().attr('src');
    var gameSlug = $(this).prev().attr('alt');
    var game = { name: gameName, image: gameImage, slug: gameSlug };
    var userGames = JSON.parse(localStorage.getItem('userGames')) || [];


    // Kontrola, zda-li je hra již na seznamu. Pokud ano, vyskočí na uživatele alert
    var existingGame = userGames.find(g => g.name === gameName);
    if (existingGame) {
      alert(`Videohra ${gameName} je již na seznamu.`);
    } else {
      userGames.push(game);
      localStorage.setItem('userGames', JSON.stringify(userGames));
      var gameElement = $('<p>').addClass('user-game-item').text(gameName);
      gameElement.append(`<img src="${gameImage}" alt="${gameName}" style="width:300px;height:170px;">`);
      var removeButton = $('<button>').addClass('remove-button').text('Odebrat ze seznamu');
      gameElement.append(removeButton);
      userGamesContainer.append(gameElement);
      // Odstranění textu o prázdném listu uživatele
      if (userGames.length > 0) {
        userGamesContainer.find('.empty-text').remove();
      }

    }
  });

  //Scroll pro načtené default hry / vyhledané hry
  $(randomGamesContainer).on('mousewheel DOMMouseScroll', function (e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if (delta > 0) {
      // Pokud se scrolluje dolů, list se pohybuje vlevo
      randomGamesContainer.animate({ scrollLeft: '-=300' });
    } else {
      // Pokud se scrolluje nahoru, lsit se posouvá vpravo
      randomGamesContainer.animate({ scrollLeft: '+=300' });
    }
  });


  //Scroll list pro uložené hry uživatele
  $(userGamesContainer).on('mousewheel DOMMouseScroll', function (e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if (delta > 0) {
      // Pokud se scrolluje dolů, list se pohybuje vlevo
      userGamesContainer.animate({ scrollLeft: '-=300' });
    } else {
      // Pokud se scrolluje nahoru, lsit se posouvá vpravo
      userGamesContainer.animate({ scrollLeft: '+=300' });
    }
  });


  // Přidání listeneru pro odstranění hry ze seznamu uživatelských her
  $(document).on('click', '.remove-button', function () {
    var gameName = $(this).prev().text();
    var gameIndex = userGames.findIndex(game => game.name === gameName);
    userGames.splice(gameIndex, 1);
    localStorage.setItem('userGames', JSON.stringify(userGames));
    $(this).parent().remove();
    if (userGames.length === 0) {
      // Přidání informace o prázdném listu do userGamesContainer
      userGamesContainer.append(emptyText);
    }
  });



  // Funkce vyhledávání. Automaticky se spustí 2 sekundy po posledním stisku klávesy v search fieldu.
  // Pokud je searchfield prázdný, načte se default list her
  var searchTimeout;
  $('#search-field').on('input', function () {
    clearTimeout(searchTimeout);
    var searchTerm = $('#search-field').val();
    if (searchTerm.trim() !== "") {
      searchTimeout = setTimeout(function () {
        axios.get(`https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&search=${searchTerm}&search_exact=1&page_size=3`)
          .then(function (response) {
            if (response.data.results.length === 0) {
              randomGamesContainer.empty();
              var noResultsText = $('<p>').addClass('no-results-text').text('No results found');
              randomGamesContainer.append(noResultsText);
            } else {
              randomGamesContainer.empty()
              randomGamesContainer.find('.no-results-text').remove();
              $.each(response.data.results, function (index, game) {
                var gameElement = $('<p>').addClass('game-item').text(game.name);
                var gameImage = game.background_image;
                gameElement.append(`<img src="${gameImage}" alt="${game.slug}" style="width:300px;height:170px;">`);
                var addButton = $('<button>').addClass('add-button').text('Add to list');
                gameElement.append(addButton);
                randomGamesContainer.append(gameElement);
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 2000);
    } else {
      randomGamesContainer.empty()
      randomGamesContainer.find('.no-results-text').remove();
      axios.get('https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&page_size=25').then(function (response) {
        $.each(response.data.results, function (index, game) {
          var gameName = game.name;
          var gameImage = game.background_image;
          var gameSlug = game.slug;
          var gameElement = $('<p>').addClass('game-item').text(gameName);
          gameElement.append(`<img src="${gameImage}" alt="${gameSlug}" style="width:300px;height:170px;">`);
          var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
          gameElement.append(addButton);
          randomGamesContainer.append(gameElement);
        });
      });
    }
  });

});

