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
        currentListing: null,
        fetchErrors: {
            fetchGenres: null,
            fetchCountries: null,
            fetchMovieById: null,
            fetchMovieCredits: null
        },
        init: () => {
            DOM.searchForm.submit((e) => {
                e.preventDefault();
            });

            DOM.Aside.btnNewReleases.click(() => {
                if (App.currentListing !== "Recently released") {
                    App.Pagination.isRendered = false;
                    App.currentListing = null;
                    listLatest();
                } else {
                    renderMovieListing(App.currentMovieList);
                }
            });

            DOM.Aside.btnMostPopular.click(() => {
                if (App.currentListing !== "Most popular") {
                    App.Pagination.isRendered = false;
                    App.currentListing = null;
                    listMostPopular();
                } else {
                    renderMovieListing(App.currentMovieList);
                }
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

        // show details
        movieCardElement.click(() => showDetails(App.currentMovieList[movie.index]));

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
                btnFirstElement.click(() => {
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

    const fetchMovieCredits = async (movie_id) => {
        const url = API_STRINGS.BASE + `/movie/${movie_id}/credits` + API_STRINGS.KEY + "&sort=popularity";

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchMovieCredits = error;
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
            App.currentListing = "Recently released"

            let movieList = response.data.results;
            let movieIndex = 0;
            for (const movie of movieList) {
                const movieDetails = await fetchMovieById(movie.id);
                if (!movieDetails) {
                    break;
                }

                movieDetails.index = movieIndex;
                movieIndex++;

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
            App.currentListing = "Most popular"
            // App.Pagination.maxPages = response.data.total_pages;
            App.Pagination.maxPages = 5;

            let movieList = response.data.results;
            let movieIndex = 0;
            for (const movie of movieList) {
                const movieDetails = await fetchMovieById(movie.id);
                if (!movieDetails) {
                    break;
                }

                movieDetails.index = movieIndex;
                movieIndex++;

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

    const showDetails = async (movie) => {
        DOM.contentPanel.empty();
        DOM.pagination.remove();
        App.Pagination.isRendered = false;

        refreshErrorStatus();

        // back to listing button
        const btnBackToListing = $(`<button class="back-to-listing"><i class="fa fa-reply-all"></i>Back to movie listing</button>`);
        btnBackToListing.click(() => {
            refreshContentPanel(App.currentListing);
            renderMovieListing(App.currentMovieList);

            if (App.currentListing === "Most popular") {
                renderPagination(listMostPopular);
            }
        });


        // movie details container & info panel
        const movieDetailsContainer = $('<div class="movie-details-container"></div>');
        const movieDetailsInfo = $('<div class="movie-details-info"></div>');
        movieDetailsInfo.html(`
            <h2>${movie.title}</h2>
            <hr>
            <div class="movie-details-original-title-wrapper">
                <p class="movie-details-original-title">${movie.original_title}</p>
                <p class="movie-details-release-date">Released: ${(movie.release_date).substring(0, 4)}</p>
            </div>
        `);

        // todo - rating in percentages
        const movieDetailsRatingRowElement = $('<div class="movie-details-row"></div>');
        movieDetailsRatingRowElement.html(`
        <div class="movie-details-rating">
            <div class="rating-high">${(parseFloat(movie.vote_average)).toFixed(2)}</div>
            <p>Viewer rating</p>
        </div>
        `);

        const starPanel = renderRatingPanel();
        movieDetailsRatingRowElement.append(starPanel);

        // todo check if movie is in favourites
        const addToFavouritesElement = $(`
        <div class="movie-details-favourites">
            <div><i class="fa fa-heart"></i></div>
        </div>`);
        movieDetailsRatingRowElement.append(addToFavouritesElement);
        movieDetailsInfo.append(movieDetailsRatingRowElement);

        // overview
        const movieOverview = $(`
        <div class="movie-details-overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
        </div>`);
        movieDetailsInfo.append(movieOverview);

        // genres
        const movieDetailsGenres = renderMovieGenres(movie);
        movieDetailsInfo.append(movieDetailsGenres);
        movieDetailsInfo.append($('<hr><h3>Details</h3>'));

        // details & cast
        const movieDetailsMeta = renderMovieMetadata(movie);
        const movieDetailsCredits = await renderMovieCredits(movie);
        movieDetailsInfo.append(movieDetailsMeta, movieDetailsCredits);

        // image
        const movieDetailsImage = $(`
        <div class="movie-details-img">
            <img src="${API_STRINGS.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie titled &quot;${movie.title}&quot;">
        </div>`);

        movieDetailsContainer.append(movieDetailsInfo, movieDetailsImage);
        DOM.contentPanel.append(btnBackToListing, movieDetailsContainer);
    };

    const renderRatingPanel = () => {
        const ratingContainer = $('<div class="movie-details-user-rating"></div>');
        const ratingPanelElement = $('<div class="movie-details-rating-panel"></div>');

        let starList = [];
        for (let i = 0; i < 5; i++) {
            const star = $('<i class="fa fa-star"></i>');
            starList.push(star);
        }

        // todo check if movie is already rated

        // star rating click event
        starList.forEach((star, index) => {
            star.click(() => {
                // todo zapsat si hodnotu ratingu filmu a pak s ni dal pracovat
                let userStarsRating = index + 1;

                starList.forEach((star, index2) => {
                    index >= index2 ? star.addClass("active") : star.removeClass("active");
                });
            });
        });

        ratingPanelElement.append(starList);
        ratingContainer.append(ratingPanelElement);

        return ratingContainer;
    }

    const renderMovieGenres = (movie) => {
        const resultElement = $(`
        <hr>
        <h3>Genres</h3>
        `);

        const movieGenresElement = $('<div class="movie-details-genres"></div>');
        let genreElementList = [];
        movie.genres.forEach((genre) => {
            const genreItemElement = $(`<div class="movie-details-genre">${genre.name}</div>`);
            genreElementList.push(genreItemElement);
        });

        movieGenresElement.append(genreElementList);
        resultElement.append(movieGenresElement);
        return resultElement;
    }

    const renderMovieMetadata = (movie) => {
        // production countries
        const movieMetadataElement = $('<div class="movie-details-metadata">');
        let countryList = [];
        movie.production_countries.forEach((country) => {
            countryList.push(country.iso_3166_1);
        });

        const countriesElement = $(`<p class="movie-details-origin">Production countries: ${countryList.join(', ')}</p>`);
        movieMetadataElement.append(countriesElement);

        // language list
        let languagesList = [];
        movie.spoken_languages.forEach((language) => {
            languagesList.push(language.english_name);
        });

        const languagesElement = $(`<p class="movie-details-languages">Languages: ${languagesList.join(', ')}</p>`);
        movieMetadataElement.append(languagesElement);

        const runtimeElement = $(` <p class="movie-details-runtime">Length: ${movie.runtime} minutes</p>`);
        movieMetadataElement.append(runtimeElement);
        return movieMetadataElement;
    }

    const renderMovieCredits = async (movie) => {
        const resultElement = $('<div class="movie-details-authors">');

        const credits = await fetchMovieCredits(movie.id)
        if (!credits) {
            // todo error handling
            console.log(App.fetchErrors.fetchMovieById);
        }

        let directorsList = [];
        let writersList = [];
        let cameraList = [];
        let composerList = [];
        let actorList = [];

        credits.crew.forEach((person) => {
            if (person.department === "Directing") {
                directorsList.push(person.name);
            }

            if (person.department === "Writing") {
                writersList.push(person.name);
            }

            if (person.department === "Camera") {
                cameraList.push(person.name);
            }

            if (person.job === "Original Music Composer" && person.department === "Sound") {
                composerList.push(person.name);
            }
        });

        credits.cast.forEach((person) => {
            actorList.push(person.name);
        });

        if (directorsList !== undefined && directorsList.length > 0) {
            const directorsElement = $(`<p class="movie-details-directors">Directors: ${directorsList.join(', ')}</p>`);
            resultElement.append(directorsElement);
        }

        if (writersList !== undefined && writersList.length > 0) {
            const writersElement = $(`<p class="movie-details-writers">Writers: ${writersList.join(', ')}</p>`);
            resultElement.append(writersElement);
        }

        if (cameraList !== undefined && cameraList.length > 0) {
            const cameraElement = $(`<p class="movie-details-camera">Camera: ${cameraList.join(', ')}</p>`);
            resultElement.append(cameraElement);
        }

        if (composerList !== undefined && composerList > 0) {
            const composersElement = $(`<p class="movie-details-music">Music: ${composerList.join(', ')}</p>`);
            resultElement.append(composersElement);
        }

        if (actorList !== undefined && actorList > 0) {
            const actorsElement = $(`<p class="movie-details-actors">Actors: ${cameraList.join(', ')}</p>`);
            resultElement.append(actorsElement);
        }

        return resultElement;
    };

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

    const refreshErrorStatus = () => {
        App.fetchErrors.fetchMovieById = null;
        App.fetchErrors.fetchMovieCredits = null;
    }

    const refreshContentPanel = (title) => {
        // reset fetch error status
        refreshErrorStatus();

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