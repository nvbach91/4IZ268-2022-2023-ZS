(() => {
    // todo

    // state object
    const App = {
        currentPage: 1,
        selectedParams: {
            categories: [],
            origin: "",
            year: "",
            rating: ""
        },
        genreList: [],
        currentMovieList: [],
        fetchErrors: {
            fetchGenres: "",
            fetchMovieById: ""
        },
        init: function () {

            DOM.searchForm.submit((e) => {
                e.preventDefault();
            });


            DOM.Aside.btnNewReleases.click(async () => {
                listLatest();
            })
        }
    };

    // DOM object
    const DOM = {
        Aside: {
            btnNewReleases: $('#btn-list-new'),
            btnMostPopular: $('#btn-list-popular')
        },
        searchForm: $('.movie-searchbar'),
        contentPanel: $('.content-panel'),
        spinner: $('<div class="spinner">')
    }

    // API strings
    const API_STRINGS = {
        BASE: "https://api.themoviedb.org/3/",
        BASE_MOVIE_POSTER: "https://image.tmdb.org/t/p/original",
        KEY: "?api_key=3ac4c22045a1dcb03ef960d46c30d0a2",
        NEWEST: "movie/now_playing",
        PAGE: "&page=",
        GENRE_LIST: "/genre/movie/list",
    };

    const getGenreTitles = (genreIdList) => {
        if (App.fetchErrors.fetchGenres !== "" || App.genreList.length !== 0) {
            let genreTitles = [];

            genreIdList.forEach((genreId) => {
                let genreTitle = (App.genreList.find((g) => g.id === genreId)).name;
                genreTitles.push(genreTitle);
            });

            return genreTitles;
        }

        return ["N/A"];
    }

    const renderGenreListing = (genre_id_list) => {
        const genres = getGenreTitles(genre_id_list);
        let genreElementList = [];

        genres.forEach((genre) => {
            genreElement = $(`<div class="movie-genre">${genre}</div>`);
            genreElementList.push(genreElement);
        });

        return genreElementList;
    }

    const renderCountryList = async (movie_id) => {
        const movie = (await fetchMovieById(movie_id)).data;

        if (movie === null) {
            return $('<div class="movie-country">N/A</div>');
        }

        let countryElementList = [];

        await movie.production_countries.forEach((country) => {
            const countryElement = $(`<div class="movie-country">${country.iso_3166_1}</div>`);
            countryElementList.push(countryElement);
        });

        return countryElementList;
    }

    const renderMovieCard = async (movie) => {
        const movieCardElement = $(`
        <div class="movie-card">
            <div class="movie-card-poster">
                <img src="${API_STRINGS.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie titled &quot;${movie.title}&quot;">
            </div>
            <div class="movie-card-info">
                <h3>${movie.title}</h3>
                <div class="movie-rating">${movie.vote_average}</div>
                <div class="movie-meta-data">
            </div>
        </div>
        `);

        const metaDataElement = movieCardElement.find('.movie-meta-data');

        // movie origin country
        const movieCountriesList = await renderCountryList(movie.id);
        metaDataElement.append(movieCountriesList);

        // movie release year
        const movieYear = $(`<div class="movie-release-year">${(movie.release_date).substring(0, 4)}</div>`);
        metaDataElement.append(movieYear);

        // movie genres
        const genreElementList = renderGenreListing(movie.genre_ids);
        metaDataElement.append(genreElementList);

        return movieCardElement;
    };

    const renderMovieListing = async (movieList) => {
        const movieCardWrapper = $('<div class="movie-cards-wrapper"></div>');
        DOM.contentPanel.append(movieCardWrapper);

        let movieCardList = [];
        for (const movie of movieList) {
            const movieCard = await renderMovieCard(movie);
            movieCardList.push(movieCard);
        }

        movieCardWrapper.append(movieCardList);
        DOM.contentPanel.append(movieCardWrapper);
    };

    const fetchMovieByTitle = (title) => { };

    const fetchMovieById = async (id) => {
        // https://api.themoviedb.org/3/movie/715931?api_key=3ac4c22045a1dcb03ef960d46c30d0a2
        const url = API_STRINGS.BASE + `movie/${id}` + API_STRINGS.KEY;

        return await axios.get(url);
    }

    const showError = (error) => {
        DOM.contentPanel.empty();

        const headingElement = $('<h2 class="content-panel-heading">Error</h2>');
        headingElement.appendTo(DOM.contentPanel);

        console.log(error);

        // todo vypsat error message na stránku
    }

    const listFiltered = (params) => { };

    const listLatest = () => {
        refreshContentPanel("Nejnovější filmy");

        const url = API_STRINGS.BASE + API_STRINGS.NEWEST + API_STRINGS.KEY;
        // console.log(url);

        axios.get(url).then((response) => {
            // console.log(response.data);
            // console.log(response.data.results);

            App.currentMovieList = response.data.results;
            App.currentPage = response.data.page;

            renderMovieListing(App.currentMovieList);
        }).catch((error) => {
            showError(error);
        });

    };

    const fetchGenres = () => {
        const url = API_STRINGS.BASE + API_STRINGS.GENRE_LIST + API_STRINGS.KEY;

        axios.get(url).then((response) => {
            App.genreList = response.data.genres;
        }).catch((error) => {
            // todo
            console.log(error);

            App.fetchErrors.fetchGenres = error;
        });
    }


    const listFavourites = () => { };

    const listRated = () => { };

    const showDetails = (movie) => { };

    const rateMovie = (rating) => { };

    const addToFavourites = (movie) => { };

    const addToRated = (movie) => { };

    const deleteFromRated = (movie) => { };

    const deleteFromFavourites = (movie) => { };

    const deleteAllRated = () => { };

    const deleteAllFavourites = () => { };

    const changeRating = (movie, rating) => { };

    const showSpinner = () => {
        // spinner.appendTo("");
    };

    const hideSpinner = () => {
        spinner.remove();
    };

    const showPagination = (movies) => { };

    const refreshContentPanel = (title) => {
        // reset fetch error status
        App.fetchErrors.fetchGenres = "";
        App.fetchErrors.fetchMovieById = "";

        // clear content panel
        DOM.contentPanel.empty();

        fetchGenres();

        // set new title
        const headingElement = $(`<h2 class="content-panel-heading">${title}</h2>`);

        headingElement.appendTo(DOM.contentPanel);
    }

    $(document).ready(() => {
        App.init();
    });
})();