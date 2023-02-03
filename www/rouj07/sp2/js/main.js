$(document).ready(() => {
    creating();
    $("#searchForm").on("submit", (event) => {
        let searchText = $("#searchText").val();
        getMovies(searchText);
        event.preventDefault();
    });
});

const title = $('.title');
const genre = $('.genre');
const released = $('.released');
const director = $('.director');
const writer = $('.writer');
const actors = $('.actors');
const imdbRating = $('.imdb-rating');
const plot = $('.plot');
const input = $('.search');


$('.search-button').click(setQuery);
const noName = 'You must enter a name of a movie or a tv series'
//function calls getMovie (if there is some input)
function setQuery() {
    if (input != 0) {
        getMovies(input.val());
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

const overlay = $('.overlay');
const container = $('.container');
const particular = $('.particular');
function getMovies(searchText) {
    overlay.show();
    container.show()
    particular.hide()
    axios
        .get(`http://www.omdbapi.com/?i=tt3896198&apikey=70e522f5&s=${searchText}`)
        .then((response) => {
            overlay.hide();
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) => {
                output += `
                    <div class="item">
                    <img src="${movie.Poster}"/>
                            <h4>${movie.Title}</h4>
                            <div>${movie.Year}</div>
                            <button onclick="movieSelected('${movie.imdbID}')"class="btn">Movie Details</button>
                    </div>`;
            });
            $('.output').html(output);
        })
        .catch((error) => {
            console.log(error);
        });

}

function movieSelected(id) {
    sessionStorage.setItem('key', id);
    console.log(sessionStorage.getItem('key'));
    getMovie();

}

const notExistingMovie = 'I can\'t find this movie';

//axios gets info about searched movie
function getMovie() {
    let movieId = sessionStorage.getItem('key');
    overlay.show();
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=70e522f5`).then((resp) => {
        overlay.hide();
        const movie = resp.data;
        const posterImg = $('<img class="poster">');
        posterImg.appendTo('.img');
        const poster = $('.poster');
        poster.attr('src', movie.Poster);
        poster.attr('alt', '');
        title.text(movie.Title);
        genre.text(movie.Genre);
        released.text(movie.Released);
        director.text(movie.Director);
        writer.text(movie.Writer);
        actors.text(movie.Actors);
        imdbRating.text(movie.imdbRating);
        plot.text(movie.Plot);
        container.hide()
        particular.show();

        sessionStorage.setItem('title', movie.Title);

        if (movie.Poster === 'N/A') {
            poster.attr('src', 'https://charbase.com/images/glyph/65110');
        }

        if (resp.data.Error) {
            console.log("no data found");
            title.text(notExistingMovie);
            poster.attr('src', '');
            genre.text('');
            released.text('');
            director.text('');
            writer.text('');
            actors.text('');
            imdbRating.text('');
            plot.text('');
        }
    })
        .catch((err) => {
            console.log(err);
        })

    $('.save-button').click(save);

    const alreadySaved = 'You already saved this movie'

    //save-button.click can save a movie to local storage
    function save() {
        movies.empty()
        buttons.empty()
        let searchedText = sessionStorage.getItem('title');
        let key = searchedText.split(',', 1);
        localStorage.setItem(key, searchedText);
        creating();

    }
}

const movies = $('.movies');
const buttons = $('.buttons');
const caption = $('.caption');
//creates text and buttons for saved movies 
function creating() {
    const text = [];
    const bttns = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key)
        let value = localStorage.getItem(key);
        console.log(value)
        let split = value.split(',', 1);
        console.log(split)
        const movieText = $('<p class="text">')
        movieText.text(`${value}`);
        text.push(movieText);

        const loadButton = $('<button class="button">&#10003;</button>')
        bttns.push(loadButton);

        const deleteButton = $('<button class="button">&#10006;</button>')
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
            movies.remove();
            buttons.remove();
            caption.show();
        }
        caption.hide();
    }


    movies.append(...text);
    buttons.append(...bttns);

}


