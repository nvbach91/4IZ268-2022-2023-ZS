$(document).ready(() => {

    $('.search-button').click(setQuery);
    const noName = 'You must enter a name of a movie or a tv series'
    //function calls getMovie (if there is some input)
    function setQuery() {
        if ($('.search').val() != 0) {
            getMovie($('.search').val());
        } else {
            $('.title').text(noName);
            $('.poster').attr('src', '');
            $('.genre').text('');
            $('.released').text('');
            $('.director').text('');
            $('.writer').text('');
            $('.actors').text('');
            $('.imdb-rating').text('');
            $('.plot').text('');
        }
    }

    const posterImg = $('<img class="poster">');
    posterImg.appendTo('.img');

    const notExistingMovie = 'I can\'t find this movie';

    //axios gets info about searched movie
    function getMovie(searchText) {
        $('.overlay').show();
        axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=70e522f5&t=${searchText}`).then((resp) => {
            $('.overlay').hide();
            const movie = resp.data;
            $('.poster').attr('src', movie.Poster)
            $('.title').text(movie.Title);
            $('.genre').text(movie.Genre);
            $('.released').text(movie.Released);
            $('.director').text(movie.Director);
            $('.writer').text(movie.Writer);
            $('.actors').text(movie.Actors);
            $('.imdb-rating').text(movie.imdbRating);
            $('.plot').text(movie.Plot);

            sessionStorage.setItem('title', movie.Title);

            if (movie.Poster === 'N/A') {
                $('.poster').attr('src', 'https://charbase.com/images/glyph/65110');
            }

            if (resp.data.Error) {
                console.log("no data found");
                $('.title').text(notExistingMovie);
                $('.poster').attr('src', '')
                $('.genre').text('');
                $('.released').text('');
                $('.director').text('');
                $('.writer').text('');
                $('.actors').text('');
                $('.imdb-rating').text('');
                $('.plot').text('');
            }
        })
            .catch((err) => {
                console.log(err);
            })

        $('.save-button').click(save);

        const alreadySaved = 'You already saved this movie'

        //save-button.click can save a movie to local storage
        function save() {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(localStorage.key(i)).includes($('.title').text())) {
                    $('.title').text(alreadySaved)
                    $('.poster').attr('src', '')
                    $('.genre').text('');
                    $('.released').text('');
                    $('.director').text('');
                    $('.writer').text('');
                    $('.actors').text('');
                    $('.imdb-rating').text('');
                    $('.plot').text('');
                }
            }
            let searchedText = sessionStorage.getItem('title');
            let key = searchedText.split(',', 1);
            if (searchedText.length != 0 && !$('.title').text().includes(notExistingMovie) && !$('.title').text().includes(noName) && !$('.title').text().includes(alreadySaved)) {
                localStorage.setItem(key, searchedText);
                location.reload();
            }
        }
    }

    const text = [];
    const bttns = [];

    //creates text and buttons for saved movies 
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let split = value.split(',', 1);

        const movieText = $('<p>')
        movieText.text(`${value}`);
        text.push(movieText);

        const loadButton = $('<button>&#10003;</button>')
        bttns.push(loadButton);

        const deleteButton = $('<button>&#10006;</button>')
        bttns.push(deleteButton);

        const deleteAllButton = $('<button class="delete-all">Delete all</button>');
        bttns.push(deleteAllButton);
        deleteAllButton.click(deleteAll)

        function loadMovie(lKey) {
            loadButton.click(() => {
                let savedMovie = localStorage.getItem(lKey);
                getMovie(savedMovie);
            });
        }
        loadMovie(`${split}`)

        function deleteMovie(dKey) {
            deleteButton.click(() => {
                localStorage.removeItem(dKey);
                movieText.text('');
                loadButton.remove();
                deleteButton.remove();
                if (localStorage.length === 0) {
                    deleteAll();
                }
            });
        }
        deleteMovie(`${split}`)

        function deleteAll() {
            localStorage.clear();
            $('.movies').remove();
            $('.buttons').remove();
            $('.caption').show();
        }
        $('.caption').hide();
    }
    $('.movies').append(...text);
    $('.buttons').append(...bttns);

});
