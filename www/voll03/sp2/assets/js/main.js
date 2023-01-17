(() => {
    const App = {
        Pagination: {
            currentPage: 1,
            firstVisiblePage: 1,
            maxPages: null
        },
        Filters: {
            rating: "",
            genre: "",
            yearFrom: "",
            yearTo: "",
            country: ""
        },
        genreList: [],
        currentMovieList: [],
        currentListing: null,
        currentSearchQuery: "",
        fetchErrors: {
            fetchGenres: null,
            fetchCountries: null,
            fetchMovieById: null,
            fetchMovieCredits: null
        },
        init: () => {
            DOM.searchForm.submit((e) => {
                e.preventDefault();
                clearSelectedFilters();
                refreshPagination();

                App.currentListing = null;
                App.currentSearchQuery = "";

                listSearched();
            });

            DOM.btnApplyFilters.click(() => {
                refreshFilters();
                if (DOM.pagination.length > 0) {
                    DOM.pagination.remove();
                }

                App.Filters.rating = DOM.Filters.selectRating.val();
                App.Filters.genre = DOM.Filters.selectGenre.val();
                App.Filters.yearFrom = DOM.Filters.selectYearFrom.val();
                App.Filters.yearTo = DOM.Filters.selectYearTo.val();
                App.Filters.country = DOM.Filters.selectCountry.val();

                // no filters selected check
                if (App.Filters.rating === "" && App.Filters.genre === "" && App.Filters.yearFrom === ""
                    && App.Filters.yearTo === "" && App.Filters.country === "") {
                    alert('No filters selected!');
                    return;
                }

                // yearTo < yearFrom
                if (parseInt(App.Filters.yearFrom) > parseInt(App.Filters.yearTo)) {
                    alert('Wrong release years selection!');
                    return;
                }

                listFiltered();
            });

            DOM.Aside.btnNewReleases.click(() => {
                if (App.currentListing !== "Recently released") {
                    App.currentSearchQuery = "";
                    clearSelectedFilters();
                    refreshPagination();
                    listLatest();
                }
            });

            DOM.Aside.btnMostPopular.click(() => {
                if (App.currentListing !== "Most popular") {
                    App.currentSearchQuery = "";
                    clearSelectedFilters();
                    refreshPagination();
                    listMostPopular();
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
            selectRating: $('select[id="rating"]'),
            selectGenre: $('select[id="genre"]'),
            selectYearFrom: $('select[id="year-from"]'),
            selectYearTo: $('select[id="year-to"]'),
            selectCountry: $('select[id="origin"]')
        },
        searchForm: $('.movie-searchbar'),
        searchFormInput: $('#input-search-title'),
        btnSearch: $('#btn-search'),
        btnApplyFilters: $('#btn-apply-filters'),
        contentWrapper: $('.content-wrapper'),
        contentPanel: $('.content-panel'),
        pagination: $('.pagination'),
        spinner: $('<div class="spinner">')
    }

    // API strings
    const API = {
        BASE: "https://api.themoviedb.org/3/",
        BASE_MOVIE_POSTER: "https://image.tmdb.org/t/p/original",
        KEY: "?api_key=3ac4c22045a1dcb03ef960d46c30d0a2",
        NEWEST: "movie/now_playing",
        GENRE_LIST: "genre/movie/list",
        COUNTRY_LIST: "configuration/countries",
        DISCOVER: "discover/movie",
        SEARCH_MOVIE: "search/movie",
        MISC_PARAMS: "&include_adult=false&include_video=false"
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
    };

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
    };

    const renderGenreFilter = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            const genreElement = $(`<option value="${genre.id}">${genre.name}</option>`);
            genreElementList.push(genreElement);
        });

        DOM.Filters.selectGenre.append(genreElementList);
    };

    const renderCountryFilter = (countries) => {
        let countryElementList = [];
        countries.forEach((country) => {
            const countryElement = $(`
                <option value="${country.iso_3166_1}">${country.english_name}</option>
            `);
            countryElementList.push(countryElement);
        });

        DOM.Filters.selectCountry.append(countryElementList);
    };

    const renderGenreListing = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            let genreElement = $(`<div class="movie-genre">${genre.name}</div>`);
            genreElementList.push(genreElement);
        });

        return genreElementList;
    };

    const renderMovieCard = (movie) => {
        const movieCardElement = $(`
        <div class="movie-card">
            <div class="movie-card-poster">
                <img src="${API.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie titled &quot;${movie.title}&quot;">
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
    };

    const calcFirstPage = (currentPage) => {
        if (currentPage <= 5) {
            return 1;
        }

        let result = Math.floor(currentPage / 5);

        if (currentPage < 15) {
            if (currentPage === 10) {
                return 6;
            }

            return result * 5 + 1;
        }

        return result * 5;
    };

    const renderPagination = (callback) => {
        let firstPage = calcFirstPage(App.Pagination.currentPage);

        let diff = App.Pagination.maxPages - firstPage;
        let lastPage = (diff < 4) ? firstPage + diff : firstPage + 4;

        // render only for the first time or when the pagination needs to be updated
        if (firstPage === 1 || firstPage !== App.Pagination.firstVisiblePage) {
            DOM.pagination.remove();

            App.Pagination.firstVisiblePage = firstPage;

            const paginationElement = $('<div class="pagination"></div>');
            const btnPrev = $('<button id="btn-pagination-prev">&lt;&lt;</button>');
            btnPrev.click(() => {
                if (App.Pagination.currentPage !== 1) {
                    App.Pagination.currentPage--;

                    changeActivePage();

                    callback.apply();
                }
            });

            const btnNext = $('<button id="btn-pagination-next">&gt;&gt;</button>');
            btnNext.click(() => {
                if (App.Pagination.currentPage !== App.Pagination.maxPages) {
                    App.Pagination.currentPage++;

                    changeActivePage();

                    callback.apply();
                }
            });

            let paginationElementList = [btnPrev];

            // render btnFirst if first visible page is 3 or higher
            if (firstPage >= 5) {
                const btnFirstElement = $(`<button value="1">1</button>`);
                btnFirstElement.click((e) => {
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');

                    App.Pagination.currentPage = 1;
                    callback.apply();
                });

                const dotsElement = $('<span>...</span>');

                paginationElementList.push(btnFirstElement, dotsElement);
            }

            // render other page buttons
            for (let page = firstPage; page <= lastPage; page++) {
                const btnPageElement = $(`<button value="${page}">${page}</button>`);

                if (App.Pagination.currentPage === page) {
                    btnPageElement.addClass('active');
                }

                btnPageElement.click((e) => {
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');

                    App.Pagination.currentPage = page;
                    callback.apply();
                });

                paginationElementList.push(btnPageElement);
            }

            // render btnLast if maxPages is higher than last visible page
            if (App.Pagination.maxPages > lastPage) {
                const btnLastElement = $(`
                    <button value="${App.Pagination.maxPages}">${App.Pagination.maxPages}</button>
                `);
                btnLastElement.click((e) => {
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');
                    App.Pagination.currentPage = App.Pagination.maxPages;
                    callback.apply();
                });

                if (App.Pagination.maxPages - lastPage >= 1) {
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
    };

    const changeActivePage = () => {
        DOM.pagination.children().removeClass('active');
        DOM.pagination.children().each(function () {
            if (parseInt($(this).val()) === App.Pagination.currentPage) {
                $(this).addClass('active');
                return;
            }
        });
    };

    const fetchGenres = async () => {
        const url = API.BASE + API.GENRE_LIST + API.KEY;

        return await axios.get(url).then((response) => {
            return response.data.genres;
        }).catch((error) => {
            App.fetchErrors.fetchGenres = error;
            return false;
        });
    };

    const fetchCountries = async () => {
        const url = API.BASE + API.COUNTRY_LIST + API.KEY;

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchCountries = error;
            return false;
        });
    };

    const fetchMovieById = async (id) => {
        const url = API.BASE + `movie/${id}` + API.KEY;

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchMovieById = error;
            return false;
        });
    };

    const fetchMovieCredits = async (movie_id) => {
        const url = API.BASE + `/movie/${movie_id}/credits` + API.KEY + "&sort=popularity";

        return await axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            App.fetchErrors.fetchMovieCredits = error;
            return false;
        });
    };

    const getMovieDetails = async (movieList) => {
        let movieIndex = 0;
        for (const movie of movieList) {
            const movieDetails = await fetchMovieById(movie.id);
            if (!movieDetails) {
                break;
            }

            // movie must have description, genre list, language list, runtime, prod. country list,
            // rating, release date, poster and must be already released
            if (movieDetails.overview !== null && movieDetails.overview.length > 0 && movieDetails.genres.length > 0
                && movieDetails.spoken_languages.length > 0 && movieDetails.original_language.length > 0
                && movieDetails.production_countries.length > 0 && movieDetails.runtime > 0
                && movieDetails.release_date.length > 0 && movieDetails.vote_average > 0
                && movieDetails.poster_path !== null && movieDetails.status !== null
                && movieDetails.status === "Released") {

                movieDetails.index = movieIndex;
                movieIndex++;
                App.currentMovieList.push(movieDetails);
            }

        }

        if (App.fetchErrors.fetchMovieById !== null) {
            hideSpinner();
            showError(App.fetchErrors.fetchMovieById);
            return false;
        }

        return true;
    };

    const showError = (error) => {
        DOM.contentPanel.empty();
        DOM.searchFormInput.val("");

        const headingElement = $('<h2 class="content-panel-heading">Error</h2>');
        headingElement.appendTo(DOM.contentPanel);

        console.log(error);

        // todo vypsat error message na stránku
    };

    const listSearched = () => {
        refreshContentPanel("Search results");
        showSpinner();

        if (App.currentSearchQuery === "" && DOM.searchFormInput.val() !== "") {
            App.currentSearchQuery = DOM.searchFormInput.val();
            DOM.pagination.remove();
        }

        DOM.searchFormInput.val('');

        const url = API.BASE + API.SEARCH_MOVIE + API.KEY + API.MISC_PARAMS 
        + `&query=${App.currentSearchQuery.split(' ').join('+')}&page=${App.Pagination.currentPage}`;

        axios.get(url).then(async (response) => {
            if (response.data.total_results === 0) {
                const alertMessageElement = $(`<p class="search-error">No results found for "${App.currentSearchQuery}".</p>`);
                DOM.contentPanel.append(alertMessageElement);
                hideSpinner();
                return;
            }

            App.currentMovieList = [];
            App.currentListing = "Search results";

            if (response.data.total_pages > 1) {
                App.Pagination.maxPages = response.data.total_pages;
            }

            if (await getMovieDetails(response.data.results)) {
                renderMovieListing(App.currentMovieList);
                hideSpinner();

                if (App.Pagination.maxPages > 1) {
                    renderPagination(listSearched);
                }
            }
        }).catch((error) => {
            showError(error);
            hideSpinner();
        });
    };

    const getFilterParams = () => {
        let params = "";
        if (App.Filters.rating !== "") {
            params += `&sort_by=${App.Filters.rating}&vote_count.gte=1000`;
        }
        if (App.Filters.genre !== "") {
            params += `&with_genres=${App.Filters.genre}`;
        }
        if (App.Filters.yearFrom !== "") {
            params += `&primary_release_date.gte=${App.Filters.yearFrom}-01-01`;
        }
        if (App.Filters.yearTo !== "") {
            params += `&primary_release_date.lte=${App.Filters.yearTo}-12-31`;
        }
        if (App.Filters.country !== "") {
            params += `&with_origin_country=${App.Filters.country}`;
        }

        return params;
    };

    const listFiltered = () => {
        //https://api.themoviedb.org/3/discover/movie?api_key=3ac4c22045a1dcb03ef960d46c30d0a2
        //&include_adult=false&include_video=false&sort_by=vote_average.desc&with_genres=1&page=1

        // rating - sort_by=vote_average.desc / asc
        // genre - with_genres=1,2,3, ...
        // yearFrom - primary_release_date.gte=1990-01-01 
        // yearTo - primary_release_date.lte=1990-31-12
        // country - with_origin_country=FR
        refreshContentPanel("Filtered movies");
        showSpinner();

        const url = API.BASE + API.DISCOVER + API.KEY
            + API.MISC_PARAMS + getFilterParams() + "&page=" + App.Pagination.currentPage;


        axios.get(url).then(async (response) => {
            if (response.data.total_results === 0) {
                const alertMessageElement = $(`<p class="search-error">No results found for selected filters.</p>`);
                DOM.contentPanel.append(alertMessageElement);
                hideSpinner();
                return;
            }


            App.currentMovieList = [];
            App.currentListing = "Filtered movies";
            App.Pagination.maxPages = response.data.total_pages;

            if (await getMovieDetails(response.data.results)) {
                renderMovieListing(App.currentMovieList);
                hideSpinner();
                
                if (App.Pagination.maxPages > 1) {
                    renderPagination(listFiltered);
                }
            }
        }).catch((error) => {
            showError(error);
            hideSpinner();
        });
    };

    const listLatest = () => {
        refreshContentPanel("Recently released");
        DOM.pagination.remove();
        showSpinner();

        const url = API.BASE + API.NEWEST + API.KEY
            + "&page=" + App.Pagination.currentPage;

        axios.get(url).then(async (response) => {
            App.currentMovieList = [];
            App.currentListing = "Recently released";

            if (await getMovieDetails(response.data.results)) {
                renderMovieListing(App.currentMovieList);
                hideSpinner();
            }
        }).catch((error) => {
            showError(error);
            hideSpinner();
        });

    };

    const listMostPopular = () => {
        // https://api.themoviedb.org/3/discover/movie?api_key=3ac4c22045a1dcb03ef960d46c30d0a2&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
        refreshContentPanel("Most popular");
        showSpinner();

        const url = API.BASE + API.DISCOVER + API.KEY + API.MISC_PARAMS
            + `&sort_by=popularity.desc&page=${App.Pagination.currentPage}`;

        axios.get(url).then(async (response) => {
            App.currentMovieList = [];
            App.currentListing = "Most popular";
            App.Pagination.maxPages = 5;

            if (await getMovieDetails(response.data.results)) {
                renderMovieListing(App.currentMovieList);
                hideSpinner();
                renderPagination(listMostPopular);
            }
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

        refreshErrorStatus();

        // back to listing button
        const btnBackToListing = $(`<button class="back-to-listing"><i class="fa fa-reply-all"></i>Back to movie listing</button>`);
        btnBackToListing.click(() => {
            refreshContentPanel(App.currentListing);
            renderMovieListing(App.currentMovieList);

            if (App.currentListing === "Most popular") {
                renderPagination(listMostPopular);
            }

            if (App.currentListing === "Search results" && App.Pagination.maxPages > 1) {
                renderPagination(listSearched);
            }

            if (App.currentListing === "Filtered movies" && App.Pagination.maxPages > 1) {
                renderPagination(listFiltered);
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
        movieDetailsInfo.append($('<hr><h3>Genres</h3>'));
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
            <img src="${API.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie titled &quot;${movie.title}&quot;">
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
    };

    const renderMovieGenres = (movie) => {
        const movieGenresElement = $('<div class="movie-details-genres"></div>');
        let genreElementList = [];
        movie.genres.forEach((genre) => {
            const genreItemElement = $(`<div class="movie-details-genre">${genre.name}</div>`);
            genreElementList.push(genreItemElement);
        });

        movieGenresElement.append(genreElementList);
        return movieGenresElement;
    };

    const renderMovieMetadata = (movie) => {
        // production countries
        const movieMetadataElement = $('<div class="movie-details-metadata">');
        let countryList = [];
        movie.production_countries.forEach((country) => {
            countryList.push(country.iso_3166_1);
        });

        const countriesElement = $(`<p class="movie-details-origin"><strong>Production countries:</strong> ${countryList.join(', ')}</p>`);
        movieMetadataElement.append(countriesElement);

        // language list
        let languagesList = [];
        movie.spoken_languages.forEach((language) => {
            languagesList.push(language.english_name);
        });

        const languagesElement = $(`<p class="movie-details-languages"><strong>Languages:</strong> ${languagesList.join(', ')}</p>`);
        movieMetadataElement.append(languagesElement);

        const runtimeElement = $(` <p class="movie-details-runtime"><strong>Length:</strong> ${movie.runtime} minutes</p>`);
        movieMetadataElement.append(runtimeElement);
        return movieMetadataElement;
    };

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

        appendCredits(resultElement, directorsList, "directors");
        appendCredits(resultElement, writersList, "writers");
        appendCredits(resultElement, cameraList, "camera");
        appendCredits(resultElement, composerList, "music");
        appendCredits(resultElement, actorList, "actors");

        return resultElement;
    };

    const appendCredits = (movieCreditsElement, creditsList, listType) => {
        if (creditsList !== undefined && creditsList.length > 0) {
            const title = listType[0].toUpperCase() + listType.slice(1).toLowerCase();
            const creditsElement = $(`<p class="movie-details-${listType}"><strong>${title}:</strong> ${creditsList.join(', ')}</p>`);
            movieCreditsElement.append(creditsElement);
        }
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

    const refreshPagination = () => {
        App.Pagination.currentPage = 1;
        App.Pagination.firstVisiblePage = 1;
        App.Pagination.maxPages = null;

        DOM.pagination.remove();
    };

    const refreshErrorStatus = () => {
        App.fetchErrors.fetchMovieById = null;
        App.fetchErrors.fetchMovieCredits = null;
    };

    const refreshFilters = () => {
        App.Filters.rating = "",
        App.Filters.genre = "",
        App.Filters.yearFrom = "",
        App.Filters.yearTo = "",
        App.Filters.country = ""
    };

    const clearSelectedFilters = () => {
        DOM.Filters.selectRating.val("");
        DOM.Filters.selectGenre.val("");
        DOM.Filters.selectYearFrom.val("");
        DOM.Filters.selectYearTo.val("");
        DOM.Filters.selectCountry.val("");
    };

    const refreshContentPanel = (title) => {
        // reset fetch error status
        refreshErrorStatus();

        // clear content panel
        DOM.contentPanel.empty();

        // set new title
        const headingElement = $(`<h2 class="content-panel-heading">${title}</h2>`);

        headingElement.appendTo(DOM.contentPanel);
    };

    $(document).ready(() => {
        App.init();
    });
})();