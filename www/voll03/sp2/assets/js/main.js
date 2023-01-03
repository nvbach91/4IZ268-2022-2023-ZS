(() => {
    // todo

    // state object
    const App = {
        Pagination: {
            currentPage: 1,
            firstVisiblePage: 1,
            lastVisiblePage: 5,
            maxPages: null,
            isRendered: false
        },
        selectedParams: {
            categories: [],
            origin: "",
            year: "",
            rating: ""
        },
        genreList: [],
        currentMovieList: [],
        fetchErrors: {
            fetchGenres: null,
            fetchCountries: null,
            fetchMovieById: null
        },
        init: () => {
            DOM.searchForm.submit((e) => {
                e.preventDefault();
            });

            DOM.Aside.btnNewReleases.click(() => {
                App.Pagination.isRendered = false;
                listLatest();
            });

            DOM.Aside.btnMostPopular.click(() => {
                App.Pagination.isRendered = false;
                listMostPopular();
            });

            setFilters();
        },
    };

    // DOM object
    const DOM = {
        Aside: {
            btnNewReleases: $('#btn-list-new'),
            btnMostPopular: $('#btn-list-popular')
        },
        Filters: {
            selectRating: $('select[name="rating"]'),
            selectGenre: $('select[name="genre"]'),
            selectYearFrom: $('select[name="year-from"]'),
            selectYearTo: $('select[name="year-to"]'),
            selectCountry: $('select[name="origin"]')
        },
        searchForm: $('.movie-searchbar'),
        contentWrapper: $('.content-wrapper'),
        contentPanel: $('.content-panel'),
        pagination: $('.pagination'),
        spinner: $('<div class="spinner">')
    }

    // API strings
    const API_STRINGS = {
        BASE: "https://api.themoviedb.org/3/",
        BASE_MOVIE_POSTER: "https://image.tmdb.org/t/p/original",
        KEY: "?api_key=3ac4c22045a1dcb03ef960d46c30d0a2",
        NEWEST: "movie/now_playing",
        PAGE: "&page=",
        GENRE_LIST: "genre/movie/list",
        COUNTRY_LIST: "configuration/countries",
        DISCOVER: "discover/movie"
    };

    const setFilters = async () => {
        const genres = await fetchGenres();
        if (!genres) {
            // todo error handling
            console.log(App.fetchErrors.fetchGenres);
        }

        const countries = await fetchCountries()
        if (!countries) {
            // todo error handling
            console.log(App.fetchErrors.fetchCountries);
        }

        renderGenreFilter(genres);
        renderCountryFilter(countries);
        renderYearFilters();
    }

    const renderYearFilters = () => {
        const currentYear = new Date().getFullYear();

        let yearsFrom = [];
        let yearsTo = [];

        // oldest movie from tmdb api is from 1874
        for (let year = 1874; year <= currentYear; year++) {
            const yearFrom = $(`<option value="${year}">${year}</option>`);
            const yearTo = $(`<option value="${year}">${year}</option>`);

            yearsFrom.push(yearFrom);
            yearsTo.push(yearTo);
        }

        yearsTo.reverse();

        DOM.Filters.selectYearFrom.append(yearsFrom);
        DOM.Filters.selectYearTo.append(yearsTo);
    }

    const renderGenreFilter = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            const genreElement = $(`<option value="${genre.id}">${genre.name}</option>`);
            genreElementList.push(genreElement);
        });

        DOM.Filters.selectGenre.append(genreElementList);
    }

    const renderCountryFilter = (countries) => {
        let countryElementList = [];
        countries.forEach((country) => {
            const countryElement = $(`
                <option value="${country.iso_3166_1}">${country.english_name}</option>
            `);
            countryElementList.push(countryElement);
        });

        DOM.Filters.selectCountry.append(countryElementList);
    }

    const renderGenreListing = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            let genreElement = $(`<div class="movie-genre">${genre.name}</div>`);
            genreElementList.push(genreElement);
        });

        return genreElementList;
    }

    const renderMovieCard = (movie) => {
        const movieCardElement = $(`
        <div class="movie-card">
            <div class="movie-card-poster">
                <img src="${API_STRINGS.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie titled &quot;${movie.title}&quot;">
            </div>
            <div class="movie-card-info">
                <h3>${movie.title}</h3>
                <div class="movie-rating">${(parseFloat(movie.vote_average)).toFixed(2)}</div>
                <div class="movie-meta-data"></div>
            </div>
        </div>
        `);

        const metaDataElement = movieCardElement.find('.movie-meta-data');

        // movie origin countries
        let movieCountryList = [];
        movie.production_countries.forEach((country) => {
            const countryElement = $(`<div class="movie-country">${country.iso_3166_1}</div>`);
            movieCountryList.push(countryElement);
        });

        metaDataElement.append(movieCountryList);

        // movie release year
        const movieYear = $(`<div class="movie-release-year">${(movie.release_date).substring(0, 4)}</div>`);
        metaDataElement.append(movieYear);

        // movie genres
        const genreElementList = renderGenreListing(movie.genres);
        metaDataElement.append(genreElementList);

        return movieCardElement;
    };

    const renderMovieListing = (movieList) => {
        const movieCardWrapper = $('<div class="movie-cards-wrapper"></div>');
        DOM.contentPanel.append(movieCardWrapper);

        let movieCardList = [];
        movieList.forEach((movie) => {
            const movieCard = renderMovieCard(movie);
            movieCardList.push(movieCard);
        });

        movieCardWrapper.append(movieCardList);
        DOM.contentPanel.append(movieCardWrapper);
    }

    const calcFirstPage = (currentPage) => {
        switch (currentPage % 5) {
            case 0:
                return currentPage - 4;
            case 1:
                return currentPage;
            default:
                return (currentPage + 1) - (currentPage % 5);
        }
    }

    const renderPagination = (callback) => {
        let firstPage = calcFirstPage(App.Pagination.currentPage);
        let lastPage = firstPage + 4;

        // user clicked on last visible page and there are more available
        // -> push pagination another 5 pages further
        if (App.Pagination.currentPage === lastPage) {
            lastPage = App.Pagination.currentPage + 4;
            firstPage = App.Pagination.currentPage;
        }

        // user clicked on page that is getting close to the very last page
        // -> push pagination accordingly so that there are always 5 pages visible
        if (App.Pagination.maxPages - App.Pagination.currentPage < 5) {
            lastPage = App.Pagination.maxPages;
            firstPage = (App.Pagination.maxPages < 5) ? App.Pagination.maxPages : lastPage - 4;
        }

        // render only for the first time or when the pagination needs to be updated based on first page
        if (!App.Pagination.isRendered || (firstPage !== App.Pagination.firstVisiblePage)) {
            App.Pagination.isRendered = true;

            const paginationElement = $('<div class="pagination"></div>');
            const btnPrev = $('<button id="btn-pagination-prev">&lt;&lt;</button>');
            btnPrev.click(() => {
                // list this page of movies from api
                if (App.Pagination.currentPage !== 1) {
                    App.Pagination.currentPage--;
                    callback.apply();
                }
            });

            const btnNext = $('<button id="btn-pagination-next">&gt;&gt;</button>');
            btnNext.click(() => {
                // list this page of movies from api

                if (App.Pagination.currentPage !== App.Pagination.lastVisiblePage) {
                    App.Pagination.currentPage++;
                    callback.apply();
                }
            });

            let paginationElementList = [btnPrev];

            // render btnFirst if first visible page is 3 or higher
            if (firstPage > 2) {
                const btnFirstElement = $(`<button value="1">1</button>`);
                btnFirstElement.click(()=> {
                    // list this page of movies from api
                    App.Pagination.currentPage = 1;
                    callback.apply();
                });

                const dotsElement = $('<span>...</span>');

                paginationElementList.push(btnFirstElement, dotsElement);
            }

            // render other page buttons
            for (let page = firstPage; page <= lastPage; page++) {
                const btnPageElement = $(`<button value="${page}">${page}</button>`);
                btnPageElement.click(() => {
                    // list this page of movies from api
                    App.Pagination.currentPage = page;
                    callback.apply();
                })
                paginationElementList.push(btnPageElement);
            }

            // render btnLast if maxPages is higher than last visible page
            if (App.Pagination.maxPages > lastPage) {
                const btnLastElement = $(`
                    <button value="${App.Pagination.maxPages}">${App.Pagination.maxPages}</button>
                `);
                btnLastElement.click(() => {
                    // list this page of movies from api
                    App.Pagination.currentPage = App.Pagination.maxPages;
                    callback.apply();
                });

                if (App.Pagination.maxPages - lastPage > 1) {
                    const dotsElement = $('<span>...</span>');
                    paginationElementList.push(dotsElement, btnLastElement);
                } else {
                    paginationElementList.push(btnLastElement);
                }
            }

            paginationElementList.push(btnNext);

            paginationElement.append(paginationElementList);
            DOM.contentWrapper.append(paginationElement);
            DOM.pagination = $('.pagination');
        }
    }

    const fetchGenres = async () => {
        const url = API_STRINGS.BASE + API_STRINGS.GENRE_LIST + API_STRINGS.KEY;

        return await axios.get(url).then((response) => {
            return response.data.genres;
        }).catch((error) => {
            App.fetchErrors.fetchGenres = error;
            return false;
        });
    }

    const fetchCountries = async () => {
        const url = API_STRINGS.BASE + API_STRINGS.COUNTRY_LIST + API_STRINGS.KEY;

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchCountries = error;
            return false;
        });
    }

    const fetchMovieByTitle = (title) => { };

    const fetchMovieById = async (id) => {
        const url = API_STRINGS.BASE + `movie/${id}` + API_STRINGS.KEY;

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchMovieById = error;
            return false;
        });
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
        refreshContentPanel("Recently released");
        DOM.pagination.remove();
        showSpinner();

        const url = API_STRINGS.BASE + API_STRINGS.NEWEST + API_STRINGS.KEY + API_STRINGS.PAGE + "1";

        axios.get(url).then(async (response) => {
            App.Pagination.currentPage = response.data.page;
            App.currentMovieList = [];

            let movieList = response.data.results;
            for (const movie of movieList) {
                const movieDetails = await fetchMovieById(movie.id);
                if (!movieDetails) {
                    break;
                }

                App.currentMovieList.push(movieDetails);
            }

            if (App.fetchErrors.fetchMovieById !== null) {
                showError(App.fetchErrors.fetchMovieById)
            }

            renderMovieListing(App.currentMovieList);

            hideSpinner();
        }).catch((error) => {
            showError(error);
            hideSpinner();
        });

    };

    const listMostPopular = () => {
        // https://api.themoviedb.org/3/discover/movie?api_key=3ac4c22045a1dcb03ef960d46c30d0a2&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
        refreshContentPanel("Most popular");
        showSpinner();

        const url = API_STRINGS.BASE + API_STRINGS.DISCOVER + API_STRINGS.KEY
            + "&sort_by=popularity.desc&include_adult=false&include_video=false"
            + API_STRINGS.PAGE + App.Pagination.currentPage;

        axios.get(url).then(async (response) => {
            App.currentMovieList = [];
            // App.Pagination.maxPages = response.data.total_pages;
            App.Pagination.maxPages = 5;

            let movieList = response.data.results;
            for (const movie of movieList) {
                const movieDetails = await fetchMovieById(movie.id);
                if (!movieDetails) {
                    break;
                }

                App.currentMovieList.push(movieDetails);
            }

            if (App.fetchErrors.fetchMovieById !== null) {
                showError(App.fetchErrors.fetchMovieById)
            }

            renderMovieListing(App.currentMovieList);
            hideSpinner();

            renderPagination(listMostPopular);
        }).catch((error) => {
            showError(error);
            hideSpinner();
        });
    };

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
        DOM.spinner.appendTo(DOM.contentPanel);
    };

    const hideSpinner = () => {
        DOM.spinner.remove();
    };

    const showPagination = (movies) => { };

    const refreshContentPanel = (title) => {
        // reset fetch error status
        App.fetchErrors.fetchMovieById = null;

        // clear content panel
        DOM.contentPanel.empty();

        // set new title
        const headingElement = $(`<h2 class="content-panel-heading">${title}</h2>`);

        headingElement.appendTo(DOM.contentPanel);
    }

    $(document).ready(() => {
        App.init();
    });
})();