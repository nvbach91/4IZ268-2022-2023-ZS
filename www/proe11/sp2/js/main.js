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
      var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
      gameElement.append(addButton, infoButton);
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
      var gameSlug = game.slug;
      var gameElement = $('<p>').addClass('user-game-item').text(gameName);
      gameElement.append(`<img src="${gameImage}" alt="${gameSlug}" style="width:300px;height:170px;">`);
      var removeButton = $('<button>').addClass('remove-button').text('Odebrat ze seznamu');
      var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
      gameElement.append(removeButton, infoButton);
      userGamesContainer.append(gameElement);
    });
  }

  //Tlačítko přidání vybrané hry na seznam uživatelských her
  $(document).on('click', '.add-button', function () {
    var gameName = $(this).parent().text().replace("Přidat na seznam", "").replace("Více informací", "");
    var gameImage = $(this).prev().attr('src');
    var gameSlug = $(this).prev().attr('alt');
    var game = { name: gameName, image: gameImage, slug: gameSlug };
    var userGames = JSON.parse(localStorage.getItem('userGames')) || [];


    // Kontrola, zda-li je hra již na seznamu. Pokud ano, vyskočí na uživatele alert. Pokud ne, bude přidána na seznam uživatelských her.
    var existingGame = userGames.find(g => g.name === gameName);
    if (existingGame) {
    $("#more-info-dialog").html(`<p>Videohra ${gameName} je již na seznamu.</p>`);
    $("#more-info-dialog").dialog("open");
    } else {
      userGames.push(game);
      localStorage.setItem('userGames', JSON.stringify(userGames));
      var gameElement = $('<p>').addClass('user-game-item').text(gameName);
      gameElement.append(`<img src="${gameImage}" alt="${gameSlug}" style="width:300px;height:170px;">`);
      var removeButton = $('<button>').addClass('remove-button').text('Odebrat ze seznamu');
      var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
      gameElement.append(removeButton, infoButton);
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
      // Pokud se scrolluje nahoru, list se posouvá vpravo
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
      // Pokud se scrolluje nahoru, listt se posouvá vpravo
      userGamesContainer.animate({ scrollLeft: '+=300' });
    }
  });

  // Přidání listeneru pro odstranění hry ze seznamu uživatelských her
  $(document).on('click', '.remove-button', function () {
    var gameName = $(this).prev().text();
    var userGames = JSON.parse(localStorage.getItem('userGames')) || [];
    var gameIndex = userGames.findIndex(game => game.name === gameName);
    userGames.splice(gameIndex, 1);
    localStorage.setItem('userGames', JSON.stringify(userGames));
    $(this).parent().remove();
    if (userGames.length === 0) {
      userGamesContainer.append(emptyText);
    }
  });

  // Funkce vyhledávání. Automaticky se spustí po posledním stisku klávesy v search fieldu, nebo při změně search parametrů
  // Pokud je searchfield prázdný, načte se default list her
  var searchTimeout;
  $('#search-field, #page-size-select, #platform-select, #genre-select').on('input', function () {
    clearTimeout(searchTimeout);
    randomGamesContainer.empty();
    randomGamesContainer.append(spinner);
    spinner.show();
    var searchTerm = $('#search-field').val();
    var pageSize = $('#page-size-select').val();
    var platform = $('#platform-select').val();
    var genre = $('#genre-select').val();
    if (searchTerm.trim() !== "") {
      searchTimeout = setTimeout(function () {
        var platformParam = (platform === 'all') ? '' : `&platforms=${platform}`;
        var genreParam = (genre === 'all') ? '' : `&genres=${genre}`;
        axios.get(`https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&search=${searchTerm}&search_exact=1&page_size=${pageSize}${platformParam}${genreParam}`)
          .then(function (response) {
            if (response.data.results.length === 0) {
              randomGamesContainer.empty();
              var noResultsText = $('<p>').addClass('no-results-text').text('Nebyly nalezeny hry vyhovující vyhledávanému termínu');
              spinner.hide()
              randomGamesContainer.append(noResultsText);
            } else {
              spinner.hide();
              randomGamesContainer.empty()
              randomGamesContainer.find('.no-results-text').remove();
              $.each(response.data.results, function (index, game) {
                var gameElement = $('<p>').addClass('game-item').text(game.name);
                var gameImage = game.background_image;
                gameElement.append(`<img src="${gameImage}" alt="${game.slug}" style="width:300px;height:170px;">`);
                var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
                gameElement.append(addButton);
                randomGamesContainer.append(gameElement);
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 10);
    } else {
      randomGamesContainer.empty();
      randomGamesContainer.append(spinner);
      spinner.show();
      randomGamesContainer.find('.no-results-text').remove();
      var pageSize = $('#page-size-select').val();
      var platform = $('#platform-select').val();
      var genre = $('#genre-select').val();
      var platformParam = (platform === 'all') ? '' : `&platforms=${platform}`;
      var genreParam = (genre === 'all') ? '' : `&genres=${genre}`;
      axios.get(`https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&page_size=${pageSize}${platformParam}${genreParam}`)
        .then(function (response) {
          $.each(response.data.results, function (index, game) {
            var gameName = game.name;
            var gameImage = game.background_image;
            var gameSlug = game.slug;
            var gameElement = $('<p>').addClass('game-item').text(gameName);
            gameElement.append(`<img src="${gameImage}" alt="${gameSlug}" style="width:300px;height:170px;">`);
            var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
            gameElement.append(addButton);
            spinner.hide();
            randomGamesContainer.append(gameElement);
          });
        });
    }
  });

  // Nastavení pop-up dialogu
  $("#more-info-dialog").dialog({
    autoOpen: false,
    modal: true,
    width: "auto",
    height: "auto",
    position: { my: "center", at: "center", of: window }
  });


  //Spuštění pop-up okna s více informacemi o vybrané hře
  $(document).on('click', '.more-info-button', function () {
    var slug = $(this).prev().prev().attr('alt');
    axios.get(`https://api.rawg.io/api/games/${slug}?key=860c2dc5a48346e69bf64f72d4ffb18b`)
      .then(function (response) {
        var game = response.data;
        $("#more-info-dialog").html(`
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <img src=${game.background_image} alt=${game.name} style="width:300px;height:170px;">
            <p>Datum vydání: ${game.released}</p>
            <p>Žánry: ${game.genres.map(g => g.name).join(', ')}</p>
          `);
        $("#more-info-dialog").dialog("open");
      })
      .catch(function (error) {
        console.log(error);
      });
  });




});

