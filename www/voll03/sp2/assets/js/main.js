(() => {
    const App = {
        Pagination: {
            currentPage: 1,
            firstVisiblePage: 1,
            maxPages: null,
            maxPerPage: 10,
            nowShowing: 10
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

        /**  Functions */
        init: function () {
            this.setSearchAndFilters();
            this.setAsideButtons();
            setLocalStorage();
            setFilters();

            App.currentListing = "Recently released";
            listLatest();
        }, setSearchAndFilters: function () {
            // search form submit
            DOM.searchForm.submit((e) => {
                e.preventDefault();
                clearSelectedFilters();
                refreshPagination();

                App.currentListing = null;
                App.currentSearchQuery = "";

                listSearched();
            });

            // filters submit
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
        }, setAsideButtons: function () {
            DOM.Aside.btnNewReleases.click(() => App.proccessListing("Recently released", listLatest));
            DOM.Aside.btnMostPopular.click(() => App.proccessListing("Most popular", listMostPopular));
            DOM.Aside.btnFavourites.click(() => App.proccessListing("Favourites", listFavourites));
            DOM.Aside.btnRated.click(() => App.proccessListing("Rated", listRated));
            DOM.Aside.btnAbout.click(() => App.proccessListing("About", renderAboutPage));
        }, proccessListing: function (listingType, callback) {
            if (App.currentListing !== listingType) {
                App.currentSearchQuery = "";
                clearSelectedFilters();
                refreshPagination();
                callback.apply();
            }
        }
    };

    // DOM object
    const DOM = {
        Aside: {
            btnNewReleases: $('#btn-list-new'),
            btnMostPopular: $('#btn-list-popular'),
            btnFavourites: $('#btn-list-favourites'),
            btnRated: $('#btn-list-rated'),
            btnAbout: $('#btn-about')
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
        userRatingContainer: $('movie-details-user-rating'),
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

    const setLocalStorage = () => {
        const favourites = [];
        const rated = [];
        localStorage.setItem('favourites', JSON.stringify(favourites));
        localStorage.setItem('rated', JSON.stringify(rated));
    }

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

    const renderAboutPage = () => {
        refreshContentPanel("O Aplikaci");
        App.currentListing = "About";

        DOM.contentPanel.html(`
        <h2 class="content-panel-heading">O aplikaci</h2>
        <div class="home-text-panel">
            <p>Právě se nacházíte na stránkách webové aplikace, kterou jsem vytvořil pro účely kurzu 4IZ268 -
                Webové Technologie vyučovaném na Fakultě informatiky a statistiky Vysoké školy ekonomické v Praze. 
                Tato webová aplikace simuluje filmovou databázi a vychází z již podobných existujících webů tohoto typu
                (např. <a href="https://www.csfd.cz">CSFD</a>, <a href="https://www.imdb.com">IMDB</a>, 
                <a href="https://www.themoviedb.org/">TMDB</a> apod.).
            </p>
            <p>Uživatel aplikace může v databázi vyhledávat filmy a zobrazovat si jejich seznamy podle vybraných
                kategorií. Každý film si může rozkliknout detailněji a přidat mu vlastní hodnocení, nebo si
                tento film může také zařadit do seznamu svých oblíbených filmů.</p>
            <p>Pro vyhledání libovolného filmu z databáze stačí zadat jeho název do vyhledávače v záhlaví.
                Ve vyhledávači je implementováno i jednoduché filtrování. V levé postranní liště jsou rovněž
                dostupné základní filtrované seznamy filmů, včetně seznamů uživatelem hodnocených a oblíbených
                filmů.</p>
            <p>Aplikace je napsaná v JavaScriptu s použitím externích knihoven
                <a href="https://api.jquery.com/">jQuery</a> a <a href="https://axios-http.com/docs/intro">Axios</a>. 
                Pro zobrazení obsahu využívá <a href="https://developers.themoviedb.org/3">The Movie Database API</a>.
                Pro ukládání hodnocení a seznamu oblíbených filmů se využívá pouze localstorage v prohlížeči.
            </p>
            <p>Good luck & have fun!</p>
        </div>`);

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

        // if user deletes favourite/rated movies in a way that there's no need for more pages
        if (App.Pagination.maxPages === 1 && DOM.pagination.length > 0) {
            DOM.pagination.remove();
            return;
        }

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

    const listFavourites = async () => {
        refreshContentPanel("My favourite movies");
        showSpinner();

        App.currentMovieList = [];
        App.currentListing = "Favourites";

        const cachedFavList = JSON.parse(localStorage.getItem('favourites'));

        if (cachedFavList.length === 0) {
            const alertMessageElement = $('<p class="search-error">You have no movies in your favourites.</p>');
            DOM.contentPanel.append(alertMessageElement);

            if (App.Pagination.currentPage === 0) {
                refreshPagination();
                DOM.pagination.remove();
            }

            hideSpinner();
            return;
        }

        // rozdelit po strankach 
        App.Pagination.maxPerPage = 10;
        App.Pagination.maxPages = Math.ceil(cachedFavList.length / App.Pagination.maxPerPage);
        App.Pagination.nowShowing = (cachedFavList.length >= App.Pagination.maxPerPage) ? App.Pagination.maxPerPage : cachedFavList.length;

        const currentPageList = [];
        const startIndex = (App.Pagination.currentPage > 1) ? (App.Pagination.currentPage - 1) * App.Pagination.maxPerPage : 0;
        let lastIndex = (App.Pagination.currentPage === 0) ? 0 : (App.Pagination.currentPage * App.Pagination.maxPerPage) - 1;

        if (lastIndex + 1 >= cachedFavList.length) {
            lastIndex = cachedFavList.length - 1;
            App.Pagination.nowShowing = cachedFavList.length - startIndex;
        }

        for (let i = startIndex; i <= lastIndex; i++) {
            currentPageList.push(cachedFavList[i]);
        }


        if (await getMovieDetails(currentPageList)) {
            // todo tohle dat do vlastni funkce
            const listElement = $('<ul class="movie-list"></ul>');

            let listItems = [];
            App.currentMovieList.forEach((movie) => {
                const listItem = $(`<li class="movie-list-item">
                    <img src="${API.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie called &quot;${movie.title}&quot;">
                    <div>
                        <h2>${movie.title}</h2>
                        <p>${(movie.release_date).substring(0, 4)}</p>
                    </div>
                    <button class="show-details">Show movie details</button>
                    <button class="btn-list-remove">Remove</button>
                </li>`);

                listItem.find('.show-details').click(async () => {
                    showDetails(movie);
                });

                listItem.find('.btn-list-remove').click(() => {
                    removeFromFavourites(movie);
                    App.Pagination.nowShowing--;

                    if (App.Pagination.nowShowing === 0) {
                        App.Pagination.currentPage--;
                    }

                    listFavourites();
                });

                listItems.push(listItem);
            });

            listElement.append(listItems);

            const btnDeleteAll = $('<button class="btn-list-delete-all">Delete all favourites</button>');
            btnDeleteAll.click(() => deleteAllCached('favourites', listFavourites) /*deleteAllFavourites()*/);

            DOM.contentPanel.append(btnDeleteAll, listElement);

            hideSpinner();

            renderPagination(listFavourites);

        } else {
            // todo error handling
            console.log("spatne nacteni detailu filmu");
        }

    };

    const listRated = async () => {
        refreshContentPanel("My rated movies");
        showSpinner();

        App.currentMovieList = [];
        App.currentListing = "Rated";

        const cachedRatedList = JSON.parse(localStorage.getItem('rated'));

        if (cachedRatedList.length === 0) {
            const alertMessageElement = $('<p class="search-error">You have no rated movies.</p>');
            DOM.contentPanel.append(alertMessageElement);

            if (App.Pagination.currentPage === 0) {
                refreshPagination();
                DOM.pagination.remove();
            }

            hideSpinner();
            return;
        }

        // rozdelit po strankach 
        App.Pagination.maxPerPage = 10;
        App.Pagination.maxPages = Math.ceil(cachedRatedList.length / App.Pagination.maxPerPage);
        App.Pagination.nowShowing = (cachedRatedList.length >= App.Pagination.maxPerPage) ? App.Pagination.maxPerPage : cachedRatedList.length;

        const currentPageList = [];
        const startIndex = (App.Pagination.currentPage > 1) ? (App.Pagination.currentPage - 1) * App.Pagination.maxPerPage : 0;
        let lastIndex = (App.Pagination.currentPage === 0) ? 0 : (App.Pagination.currentPage * App.Pagination.maxPerPage) - 1;

        if (lastIndex + 1 >= cachedRatedList.length) {
            lastIndex = cachedRatedList.length - 1;
            App.Pagination.nowShowing = cachedRatedList.length - startIndex;
        }

        for (let i = startIndex; i <= lastIndex; i++) {
            currentPageList.push(cachedRatedList[i]);
        }

        if (await getMovieDetails(currentPageList)) {
            // todo tohle dat do vlastni funkce
            const listElement = $('<ul class="movie-list"></ul>');
            let listItems = [];
            App.currentMovieList.forEach((movie) => {
                const listItem = $(`<li class="movie-list-item">
                    <img src="${API.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie called &quot;${movie.title}&quot;">
                    <div>
                        <h2>${movie.title}</h2>
                        <p>${(movie.release_date).substring(0, 4)}</p>
                    </div>
                    <div class="movie-details-user-rating">
                        <div class="movie-details-rating-panel"></div>
                    </div>
                    <button class="show-details">Show movie details</button>
                    <button class="btn-list-remove">Remove</button>
                </li>`);

                listItem.find('.show-details').click(async () => {
                    showDetails(movie);
                });

                listItem.find('.btn-list-remove').click(() => {
                    removeFromRated(movie);
                    App.Pagination.nowShowing--;

                    if (App.Pagination.nowShowing === 0) {
                        App.Pagination.currentPage--;
                    }

                    listRated();
                });

                // hvezdickyyyyy
                let starList = [];
                for (let i = 0; i < 5; i++) {
                    const star = $('<i class="fa fa-star"></i>');
                    starList.push(star);
                }

                const rating = getRating(movie.id);

                // star rating click event
                starList.forEach((star, index) => {
                    rating > index ? star.addClass("active") : star.removeClass("active");

                    // star rating click event
                    star.click(() => {
                        let userStarRating = index + 1;
                        const isRated = isRatedMovie(movie.id);

                        if (isRated && (getRating(movie.id) === userStarRating)) {
                            return;
                        }

                        movie.user_star_rating = userStarRating;
                        isRated ? changeRating(movie) : addToRated(movie);

                        starList.forEach((star, index2) => {
                            index >= index2 ? star.addClass("active") : star.removeClass("active");
                        });
                    });
                    // star hover effect
                    star.hover(function () {
                        starList.forEach((star, index2) => {
                            index >= index2 ? star.addClass("active") : star.removeClass("active");
                        });
                    }, function () {
                        const rating = getRating(movie.id);

                        starList.forEach((star, index2) => {
                            if (rating === 0 && index >= index2) {
                                star.removeClass("active");
                            } else {
                                rating > 0 && index2 < rating ? star.addClass("active") : star.removeClass("active");
                            }
                        });
                    });
                });

                listItem.find('.movie-details-rating-panel').append(starList);
                listItems.push(listItem);
            });

            listElement.append(listItems);

            const btnDeleteAll = $('<button class="btn-list-delete-all">Delete all rated</button>');
            btnDeleteAll.click(() => deleteAllCached('rated', listRated));

            DOM.contentPanel.append(btnDeleteAll, listElement);

            hideSpinner();
            renderPagination(listRated);

        } else {
            // todo error handling
            console.log("spatne nacteni detailu filmu");
        }
    };

    const showDetails = async (movie) => {
        DOM.contentPanel.empty();
        DOM.pagination.remove();

        refreshErrorStatus();

        // back to listing button
        const btnBackToListing = $(`<button class="back-to-listing"><i class="fa fa-reply-all"></i>Back to movie listing</button>`);
        btnBackToListing.click(() => {
            refreshContentPanel(App.currentListing);

            if (App.currentListing === "Favourites") {
                listFavourites();
                /*
                if (App.Pagination.maxPages > 1) {
                    renderPagination(listFavourites);
                }*/
            } else if (App.currentListing === "Rated") {
                listRated();
                /*
                if (App.Pagination.maxPages > 1) {
                    renderPagination(listRated);
                }*/
            } else {
                if (App.currentListing === "Most popular") {
                    renderPagination(listMostPopular);
                }

                if (App.currentListing === "Search results" && App.Pagination.maxPages > 1) {
                    renderPagination(listSearched);
                }

                if (App.currentListing === "Filtered movies" && App.Pagination.maxPages > 1) {
                    renderPagination(listFiltered);
                }

                renderMovieListing(App.currentMovieList);
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

        const starPanel = renderRatingPanel(movie);
        movieDetailsRatingRowElement.append(starPanel);

        // add/remove from favourites
        const addToFavouritesElement = $(`<div class="movie-details-favourites"></div>`);

        if (isFavourite(movie.id)) {
            addToFavouritesElement.append($('<i class="fa fa-heart active"></i>'));
            addToFavouritesElement.hover(function () {
                $(this).find('i').removeClass('fa-heart');
                $(this).find('i').addClass('fa-times-rectangle');
            }, function () {
                $(this).find('i').removeClass('fa-times-rectangle');
                $(this).find('i').addClass('fa-heart');
            });
        } else {
            addToFavouritesElement.append($('<i class="fa fa-heart"></i>'));
        }

        addToFavouritesElement.click((e) => {
            if (isFavourite(movie.id)) {
                removeFromFavourites(movie);

                $(e.currentTarget).find('i').removeClass('active');

            } else {
                addToFavourites(movie);

                $(e.currentTarget).find('i').addClass('active');
                $(e.currentTarget).hover(function () {
                    $(this).find('i').removeClass('fa-heart');
                    $(this).find('i').addClass('fa-times-rectangle');
                }, function () {
                    $(this).find('i').removeClass('fa-times-rectangle');
                    $(this).find('i').addClass('fa-heart');
                });
            }
        })

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

    const renderRatingPanel = (movie) => {
        const ratingContainer = $('<div class="movie-details-user-rating"></div>');
        const ratingPanelElement = $('<div class="movie-details-rating-panel"></div>');

        let starList = [];
        for (let i = 0; i < 5; i++) {
            const star = $('<i class="fa fa-star"></i>');
            starList.push(star);
        }

        starList.forEach((star, index) => {
            // star rating click event
            star.click(() => {
                let userStarRating = index + 1;
                movie.user_star_rating = userStarRating;
                const isRated = isRatedMovie(movie.id);

                // rate movie for the first time
                if (!isRated) {
                    addToRated(movie)
                    const btnRemoveRating = $('<button class="remove-rating">Remove rating</button>');
                    btnRemoveRating.click(() => {
                        removeFromRated(movie)
                        btnRemoveRating.remove();

                        starList.forEach((star) => {
                            star.removeClass("active");
                        });
                    });
                    ratingContainer.append(btnRemoveRating);
                }

                // change rating only if user picks different than current
                if (isRated && !(getRating(movie.id) === userStarRating)) {
                    changeRating(movie);

                    starList.forEach((star, index2) => {
                        index >= index2 ? star.addClass("active") : star.removeClass("active");
                    });
                } 

                starList.forEach((star, index2) => {
                    index >= index2 ? star.addClass("active") : star.removeClass("active");
                });
            });
            // star hover effect
            star.hover(function () {
                starList.forEach((star, index2) => {
                    index >= index2 ? star.addClass("active") : star.removeClass("active");
                });
            }, function () {
                const rating = getRating(movie.id);
                //console.log("vraci rating: " + rating);

                starList.forEach((star, index2) => {
                    if (rating === 0 && index >= index2) {
                        star.removeClass("active");
                    } else {
                        rating > 0 && index2 < rating ? star.addClass("active") : star.removeClass("active");
                    }
                });
            });
        });

        const rating = getRating(movie.id);
        starList.forEach((star, index) => {
            rating > index ? star.addClass("active") : star.removeClass("active");
        });


        ratingPanelElement.append(starList);
        ratingContainer.append(ratingPanelElement);

        // check if movie is already rated
        if (isRatedMovie(movie.id)) {
            const btnRemoveRating = $('<button class="remove-rating">Remove rating</button>');
            btnRemoveRating.click(() => {
                removeFromRated(movie)
                btnRemoveRating.remove();

                starList.forEach((star) => {
                    star.removeClass("active");
                });
            });
            ratingContainer.append(btnRemoveRating);
        }

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

    const addToFavourites = (movie) => {
        const movieObject = {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster: API.BASE_MOVIE_POSTER + movie.poster_path
        }

        let favList = JSON.parse(localStorage.getItem('favourites'));
        favList.push(movieObject);

        localStorage.setItem('favourites', JSON.stringify(favList));
    };

    const removeFromFavourites = (movie) => {
        let favList = JSON.parse(localStorage.getItem('favourites'));

        if (favList.length === 0) {
            return;
        }

        const index = favList.findIndex(item => item.id === movie.id);

        if (index !== -1) {
            favList.splice(index, 1);
            localStorage.setItem('favourites', JSON.stringify(favList));
        }
    };

    const isFavourite = (movie_id) => {
        const favList = JSON.parse(localStorage.getItem('favourites'));

        if (favList.length === 0) {
            return 0;
        }

        const index = favList.findIndex(item => item.id === movie_id);

        return (index !== -1);
    };

    const getRating = (movie_id) => {
        const ratedList = JSON.parse(localStorage.getItem('rated'));

        if (ratedList.length === 0) {
            return 0;
        }

        const index = ratedList.findIndex(item => item.id === movie_id);
        return (index === -1) ? 0 : ratedList[index].user_star_rating;
    };

    const isRatedMovie = (movie_id) => {
        const ratedList = JSON.parse(localStorage.getItem('rated'));

        if (ratedList.length === 0) {
            return 0;
        }

        const index = ratedList.findIndex(item => item.id === movie_id);
        return (index !== -1);
    };

    const addToRated = (movie) => {
        const movieObject = {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster: API.BASE_MOVIE_POSTER + movie.poster_path,
            user_star_rating: movie.user_star_rating
        }

        let ratedList = JSON.parse(localStorage.getItem('rated'));
        ratedList.push(movieObject);

        localStorage.setItem('rated', JSON.stringify(ratedList));
    };

    const removeFromRated = (movie) => {
        let ratedList = JSON.parse(localStorage.getItem('rated'));

        if (ratedList.length === 0) {
            return;
        }

        const index = ratedList.findIndex(item => item.id === movie.id);
        console.log(index);

        if (index !== -1) {
            ratedList.splice(index, 1);
            localStorage.setItem('rated', JSON.stringify(ratedList));
        }
    };

    const deleteAllCached = (type, callback) => {
        localStorage.setItem(type, JSON.stringify([]));
        DOM.pagination.remove();
        callback.apply();
    };

    const changeRating = (movie) => {
        let ratedList = JSON.parse(localStorage.getItem('rated'));

        if (ratedList.length === 0) {
            return;
        }

        let index = ratedList.findIndex(item => item.id === movie.id);

        if (index !== -1) {
            ratedList[index].user_star_rating = movie.user_star_rating;
            localStorage.setItem('rated', JSON.stringify(ratedList));
        }
    };

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