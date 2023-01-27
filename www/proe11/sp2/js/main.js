$(document).ready(() => {
  var randomGamesContainer = $('#random-games-container');
  var userGamesContainer = $('#user-games-container');
  var emptyText = $('<p>').addClass('empty-text').text('Seznam videoher je prázdný.');
  var spinner = $('<div>').addClass('spinner');
  spinner.show();
  var gamesToShow = [];
  var userGamesToShow = [];
  var searchResults = [];
  randomGamesContainer.append(spinner);
  var gameData = {};


  // Nahrání základních her z RAWG
  axios.get('https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&page_size=25').then(function (response) {
    $.each(response.data.results, function (index, game) {
      var gameName = game.name;
      var gameImage = game.background_image;
      var gameSlug = game.slug;
      var gameElement = $('<p>').addClass('game-item').text(gameName);
      gameElement.append(`<img src='${gameImage}' alt='${gameSlug}'>`);
      var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
      var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
      gameElement.append(addButton, infoButton);
      gamesToShow.push(gameElement);
    });
    spinner.hide();
    randomGamesContainer.append(gamesToShow);
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
      gameElement.append(`<img src='${gameImage}' alt='${gameSlug}'>`);
      var removeButton = $('<button>').addClass('remove-button').text('Odebrat ze seznamu');
      var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
      gameElement.append(removeButton, infoButton);
      userGamesToShow.push(gameElement)
    });
    userGamesContainer.append(userGamesToShow);
  }

  //Tlačítko přidání vybrané hry na seznam uživatelských her
  $(document).on('click', '.add-button', function () {
    var gameName = $(this).parent().text().replace('Přidat na seznam', '').replace('Více informací', '');
    var gameImage = $(this).prev().attr('src');
    var gameSlug = $(this).prev().attr('alt');
    var game = { name: gameName, image: gameImage, slug: gameSlug };
    var userGames = JSON.parse(localStorage.getItem('userGames')) || [];

    // Kontrola, zda-li je hra již na seznamu. Pokud ano, vyskočí na uživatele dialogov0 okno. Pokud ne, bude hra přidána na seznam uživatelských her.
    var existingGame = userGames.find(g => g.name === gameName);
    if (existingGame) {
      $(`#more-info-dialog`).html(`<p>Videohra ${gameName} je již na seznamu.</p>`);
      $(`#more-info-dialog`).dialog(`open`);
    } else {
      userGames.push(game);
      localStorage.setItem('userGames', JSON.stringify(userGames));
      var gameElement = $('<p>').addClass('user-game-item').text(gameName);
      gameElement.append(`<img src='${gameImage}' alt='${gameSlug}'>`);
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
      randomGamesContainer.animate({ scrollLeft: '-=600' });
    } else {
      // Pokud se scrolluje nahoru, list se posouvá vpravo
      randomGamesContainer.animate({ scrollLeft: '+=600' });
    }
  });

  //Scroll list pro uložené hry uživatele
  $(userGamesContainer).on('mousewheel DOMMouseScroll', function (e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if (delta > 0) {
      // Pokud se scrolluje dolů, list se pohybuje vlevo
      userGamesContainer.animate({ scrollLeft: '-=600' });
    } else {
      // Pokud se scrolluje nahoru, listt se posouvá vpravo
      userGamesContainer.animate({ scrollLeft: '+=600' });
    }
  });

  // Přidání listeneru pro odstranění hry ze seznamu uživatelských her
  $(document).on('click', '.remove-button', function () {
    var gameName = $(this).parent().text().replace('Odebrat ze seznamu', '').replace('Více informací', '');
    var userGames = JSON.parse(localStorage.getItem('userGames')) || [];
    var gameIndex = userGames.findIndex(game => game.name === gameName);
    userGames.splice(gameIndex, 1);
    localStorage.setItem('userGames', JSON.stringify(userGames));
    $(this).parent().remove();
    if (userGames.length === 0) {
      userGamesContainer.append(emptyText);
    }
  });

  // Debounce - vyhledávání se spustí až po prodlevě
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  };

  // Funkce vyhledávání. Automaticky se spustí po posledním stisku klávesy v search fieldu, nebo při změně search parametrů
  // Pokud je searchfield prázdný, načte se default list her
  $('#search-field, #page-size-select, #platform-select, #genre-select').on('input', debounce(function () {
    randomGamesContainer.empty();
    randomGamesContainer.append(spinner);
    spinner.show();
    var searchTerm = $('#search-field').val();
    var pageSize = $('#page-size-select').val();
    var platform = $('#platform-select').val();
    var genre = $('#genre-select').val();
    // Spouští se, když není vyhledávací pole prázdné, bere informace z polí platformy, velikosti výsledků a žánru.
    if (searchTerm.trim() !== "") {
      var platformParam = (platform === 'all') ? '' : `&platforms=${platform}`;
      var genreParam = (genre === 'all') ? '' : `&genres=${genre}`;
      axios.get(`https://api.rawg.io/api/games?key=860c2dc5a48346e69bf64f72d4ffb18b&search=${searchTerm}&search_exact=1&page_size=${pageSize}${platformParam}${genreParam}`)
        .then(function (response) {
          // 0 výsledků, vyhodí hlášku že nebylo nic nalezeno
          if (response.data.results.length === 0) {
            randomGamesContainer.empty();
            var noResultsText = $('<p>').addClass('no-results-text').text('Nebyly nalezeny hry vyhovující vyhledávanému termínu');
            randomGamesContainer.append(noResultsText);
            spinner.hide()
          } else {
            // Výsledky nejsou prázdné, vytvoří se gameElementy
            randomGamesContainer.find('.no-results-text').remove();
            $.each(response.data.results, function (index, game) {
              var gameElement = $('<p>').addClass('game-item').text(game.name);
              var gameImage = game.background_image;
              gameElement.append(`<img src='${gameImage}' alt='${game.slug}'>`);
              var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
              var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
              gameElement.append(addButton, infoButton);
              searchResults.push(gameElement);
            });
            randomGamesContainer.empty();
            randomGamesContainer.append(searchResults);
            searchResults.length = 0;
            spinner.hide();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //Vyhledávací pole je prázdné, používají se filtry pro nastavení žánru, platformy a velikosti výsledků
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
            gameElement.append(`<img src='${gameImage}' alt='${gameSlug}'>`);
            var addButton = $('<button>').addClass('add-button').text('Přidat na seznam');
            var infoButton = $('<button>').addClass('more-info-button').text('Více informací');
            gameElement.append(addButton, infoButton);
            searchResults.push(gameElement);
          });
          spinner.hide();
          randomGamesContainer.empty();
          randomGamesContainer.append(searchResults);
          searchResults.length = 0;

        });
    }
  }));

  // Nastavení pop-up dialogu
  $('#more-info-dialog').dialog({
    autoOpen: false,
    modal: true,
    autoOpen: false,
    modal: true,
    width: 'auto',
    height: 'auto',
    position: { my: 'center', at: 'center', of: window }
  });

  //Vykreslení okna více informací
  function displayGameInfo(gameInfo) {
    $('#more-info-dialog').html(`
        <h2>${gameInfo.name}</h2>
        <p>${gameInfo.description}</p>
        <p>Datum vydání: ${gameInfo.releaseDate}</p>
        <p>Žánry: ${gameInfo.genres}</p>
        <img src=${gameInfo.image} alt=${gameInfo.slug}></img>
    `);
    $('#more-info-dialog').dialog('open');
  }



  $(document).on('click', '.more-info-button', function () {
      var slug = $(this).prev().prev().attr('alt');
      // Ověření, zda-li ifno již není v gameData objektu
      if (gameData[slug]) {
          displayGameInfo(gameData[slug]);
      } else {
          axios.get(`https://api.rawg.io/api/games/${slug}?key=860c2dc5a48346e69bf64f72d4ffb18b`)
          .then(response => {
              var game = response.data;
              var gameInfo = {
                  slug: game.slug,
                  name: game.name,
                  image: game.background_image,
                  description: game.description,
                  genres: game.genres.map(g => g.name).join(', '),
                  releaseDate: game.released
              };
              // Přidání dat do gameData objektu
              gameData[slug] = gameInfo;
              displayGameInfo(gameInfo);
          })
          .catch(error => {
              console.log(error);
          });
      }
  });
  




});