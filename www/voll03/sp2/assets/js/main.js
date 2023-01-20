import { DOM, API, fetchGenres, fetchCountries, fetchMovieById, fetchMovieCredits } from './resources.js';
import { LocalStorage } from './localstorage.js';

(() => {
    // App state object
    const App = {
        Pagination: {
            currentPage: 1,
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
        currentMovieList: [],
        currentListing: null,
        currentSearchQuery: "",
        fetchErrors: {
            fetchGenres: null,
            fetchCountries: null,
            fetchMovieById: null,
            fetchMovieCredits: null
        },

        // init function
        init: function () {
            LocalStorage.init();

            this.setSearchAndFilters();
            this.setAsideButtons();
            setFilters();

            App.currentListing = "Recently released";
            listLatest();
        },

        // setup search and filters
        setSearchAndFilters: function () {
            // search form submit
            DOM.searchForm.submit((e) => {
                e.preventDefault();
                clearAllFilters();
                refreshPagination();

                App.currentListing = null;
                App.currentSearchQuery = "";

                listSearched();
            });

            // filters submit
            DOM.btnApplyFilters.click(() => {
                refreshFilters();
                refreshPagination();
                DOM.pagination.remove();

                App.Filters.rating = DOM.Filters.selectRating.val();
                App.Filters.genre = DOM.Filters.selectGenre.val();
                App.Filters.yearFrom = DOM.Filters.selectYearFrom.val();
                App.Filters.yearTo = DOM.Filters.selectYearTo.val();
                App.Filters.country = DOM.Filters.selectCountry.val();

                // no filters selected check
                if (App.Filters.rating === "" && App.Filters.genre === "" && App.Filters.yearFrom === ""
                    && App.Filters.yearTo === "" && App.Filters.country === "") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Filter error',
                            text: 'No filters selected!'
                        });
                    return;
                }

                // yearTo < yearFrom
                if (parseInt(App.Filters.yearFrom) > parseInt(App.Filters.yearTo)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Filter error',
                        text: 'Wrong release years selection!'
                    });
                    return;
                }

                listFiltered();
            });

        },

        // setup aside menu buttons
        setAsideButtons: function () {
            DOM.Aside.btnNewReleases.click(() => App.proccessListing("Recently released", listLatest));
            DOM.Aside.btnMostPopular.click(() => App.proccessListing("Most popular", listMostPopular));
            DOM.Aside.btnFavourites.click(() => App.proccessListing("Favourites", listFavourites));
            DOM.Aside.btnRated.click(() => App.proccessListing("Rated", listRated));
            DOM.Aside.btnAbout.click(() => App.proccessListing("About", renderAboutPage));

        },

        // show listing based on type, callback = function to be executed
        proccessListing: function (listingType, callback) {
            if (App.currentListing !== listingType) {
                App.currentSearchQuery = "";
                clearAllFilters();
                refreshPagination();
                callback.apply();
            }
        }
    };

    // setup values of listing filters
    const setFilters = async () => {
        const genres = await fetchGenres();
        if (!genres) {
            App.fetchErrors.fetchGenres = error;
            // todo error handling
            console.log(App.fetchErrors.fetchGenres);
        }

        const countries = await fetchCountries()
        if (!countries) {
            App.fetchErrors.fetchCountries = error;
            // todo error handling
            console.log(App.fetchErrors.fetchCountries);
        }

        renderGenreFilter(genres);
        renderCountryFilter(countries);
        renderYearFilters();
    };

    // get and save detail info about each movie from given movie list
    const getMovieDetails = async (movieList) => {
        let movieIndex = 0;
        for (const movie of movieList) {
            const movieDetails = await fetchMovieById(movie.id);
            if (!movieDetails) {
                App.fetchErrors.fetchMovieById = error;
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

        // error handling
        if (App.fetchErrors.fetchMovieById !== null) {
            hideSpinner();
            showError(App.fetchErrors.fetchMovieById);
            return false;
        }

        return true;
    };

    // show all search results after clicking on "find" button
    const listSearched = () => {
        // set searchQuery only once 
        if (App.currentSearchQuery === "" && DOM.searchFormInput.val() !== "") {
            App.currentSearchQuery = DOM.searchFormInput.val();
            DOM.pagination.remove();
        }

        refreshContentPanel(`Search results for &quot;${App.currentSearchQuery}&quot;`);
        showSpinner();

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

    // helper function to set params for filtering
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

    // show filtered movies after setting filters and clicking oin "Apply filters" button
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

    // show list of newly released movies
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

    // show list of most popular movies
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

    const listFavourites = () => {
        listUserMovies('favourites');
    }

    const listRated = () => {
        listUserMovies('rated');
    }

    const listUserMovies = async (type) => {
        let elementText = (type === 'rated') ? 'rated' : 'favourite';
        refreshContentPanel(`My ${elementText} movies`);
        showSpinner();

        App.currentMovieList = [];
        App.currentListing = type === 'rated' ? "Rated" : "Favourites";

        const movieList = type === 'rated' ? LocalStorage.ratedList : LocalStorage.favouritesList;

        if (movieList.length === 0) {
            const alertMessageElement = $(`<p class="search-error">You have no ${elementText} movies.</p>`);
            DOM.contentPanel.append(alertMessageElement);

            if (App.Pagination.currentPage === 0) {
                refreshPagination();
                DOM.pagination.remove();
            }

            hideSpinner();
            return;
        }

        // split listing to pages (10 movies per page)
        const currentPageList = getCurrentPageList(movieList);

        if (await getMovieDetails(currentPageList)) {
            renderListItems(App.currentListing);
            renderPagination(listUserMovies, type);
        } else {
            // todo error handling
            console.log("spatne nacteni detailu filmu");
        }
    }

    // show some error message on page (error handling)
    const showError = (error) => {
        DOM.contentPanel.empty();
        DOM.searchFormInput.val("");

        const headingElement = $('<h2 class="content-panel-heading">Error</h2>');
        headingElement.appendTo(DOM.contentPanel);

        console.log(error);
        // todo vypsat error message na stránku
    };

    // show about page
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
    };

    // show (set) year filters into yearFrom and yearTo select on page
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

    // show (set) genre filter into genre select on page
    const renderGenreFilter = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            const genreElement = $(`<option value="${genre.id}">${genre.name}</option>`);
            genreElementList.push(genreElement);
        });

        DOM.Filters.selectGenre.append(genreElementList);
    };

    // show (set) country filter into country select on page
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

    // render all genres for a movie inside movie card
    const renderGenreListing = (genres) => {
        let genreElementList = [];
        genres.forEach((genre) => {
            let genreElement = $(`<div class="movie-genre">${genre.name}</div>`);
            genreElementList.push(genreElement);
        });

        return genreElementList;
    };

    // render movie card element for given movie
    const renderMovieCard = (movie) => {
        // rating in percentages
        const rating = Math.floor(parseFloat(movie.vote_average) * 10);
        const ratingClass = getRatingClass(rating);

        const movieCardElement = $(`
        <div class="movie-card">
            <div class="movie-card-poster">
            </div>
            <div class="movie-card-info">
                <h3>${movie.title}</h3>
                <div class="movie-rating ${ratingClass}">${rating} %</div>
                <div class="movie-meta-data"></div>
            </div>
        </div>
        `);

        // movie poster (if exists)
        const movieCardPoster = movieCardElement.find('.movie-card-poster');
        if (movie.poster_path !== null && movie.poster_path !== undefined && movie.poster_path !== "") {
            movieCardPoster.css('background-image',`url(${API.BASE_MOVIE_POSTER + movie.poster_path})`);
        } 

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

    // render movie cards on page for every movie inside given list of movies
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

    // render pagination if there needs to be more than 1 page
    // for favourites and rated listing - max 10 movies per page
    // for everything else - max 20 movies per page (default API setting)
    // max amount of pages inside pagination = 5
    const renderPagination = (callback, type = null) => {
        let firstPage = calcFirstPage(App.Pagination.currentPage);
        let diff = App.Pagination.maxPages - firstPage;
        let lastPage = (diff < 4) ? firstPage + diff : firstPage + 4;

        // if user deletes favourite/rated movies in a way that there's no need for more pages
        if (App.Pagination.maxPages === 1 && DOM.pagination.length > 0) {
            DOM.pagination.remove();
            return;
        }

        // render only when there has to be more pages && only for the first time or when it's updated
        if (App.Pagination.maxPages > 1) {
            DOM.pagination.remove();

            const paginationElement = $('<div class="pagination"></div>');

            // prev button - list one page back
            const btnPrev = $('<button id="btn-pagination-prev">&lt;&lt;</button>');
            btnPrev.click(() => {
                if (App.Pagination.currentPage !== 1) {
                    App.Pagination.currentPage--;

                    changeActivePage();
                    (type === 'rated' || type === 'favourites') ? callback.apply(type) : callback.apply();
                }
            });

            // next button - list one page forward
            const btnNext = $('<button id="btn-pagination-next">&gt;&gt;</button>');
            btnNext.click(() => {
                if (App.Pagination.currentPage !== App.Pagination.maxPages) {
                    App.Pagination.currentPage++;

                    changeActivePage();
                    (type === 'rated' || type === 'favourites') ? callback.apply(type) : callback.apply();
                }
            });

            let paginationElementList = [btnPrev];

            // render btnFirst if first visible page is 3 or higher
            if (firstPage >= 5) {
                const btnFirstElement = $(`<button value="1">1</button>`);
                btnFirstElement.click((e) => {
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');

                    App.Pagination.currentPage = 1;
                    (type === 'rated' || type === 'favourites') ? callback.apply(type) : callback.apply();
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
                    (type === 'rated' || type === 'favourites') ? callback.apply(type) : callback.apply();
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
                    (type === 'rated' || type === 'favourites') ? callback.apply(type) : callback.apply();
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

    // helper function to properly calculate first rendered page of pagination
    const calcFirstPage = (currentPage) => {
        if (currentPage <= 5) {
            return 1;
        }

        let result = Math.floor(currentPage / 5);

        if (currentPage < 15) {
            return (currentPage === 10) ? 6 : (result * 5) + 1;
        }

        return result * 5;
    };

    // highlights currently active page of pagination
    const changeActivePage = () => {
        DOM.pagination.children().removeClass('active');
        DOM.pagination.children().each(function () {
            if (parseInt($(this).val()) === App.Pagination.currentPage) {
                $(this).addClass('active');
                return;
            }
        });
    };

    // controls paginaton of favourite and rated movie listings
    // calculates indexes of movies from the movie list to be shown according to what's user doing
    // max 10 movies per page
    const getCurrentPageList = (movieList) => {
        App.Pagination.maxPerPage = 10;
        App.Pagination.maxPages = Math.ceil(movieList.length / App.Pagination.maxPerPage);
        App.Pagination.nowShowing = (movieList.length >= App.Pagination.maxPerPage) ? App.Pagination.maxPerPage : movieList.length;

        const currentPageList = [];
        const startIndex = (App.Pagination.currentPage > 1) ? (App.Pagination.currentPage - 1) * App.Pagination.maxPerPage : 0;
        let lastIndex = (App.Pagination.currentPage === 0) ? 0 : (App.Pagination.currentPage * App.Pagination.maxPerPage) - 1;

        if (lastIndex + 1 >= movieList.length) {
            lastIndex = movieList.length - 1;
            App.Pagination.nowShowing = movieList.length - startIndex;
        }

        for (let i = startIndex; i <= lastIndex; i++) {
            currentPageList.push(movieList[i]);
        }

        return currentPageList;
    };

    // renders list elements for favourite or rated movies
    const renderListItems = (renderFor = 'Favourites') => {
        const listElement = $('<ul class="movie-list"></ul>');
        let listItems = [];

        // render list item element for each movie 
        App.currentMovieList.forEach((movie) => {
            const listItem = $(`<li class="movie-list-item">
            <img src="${API.BASE_MOVIE_POSTER + movie.poster_path}" alt="Poster for the movie called &quot;${movie.title}&quot;">
                <div>
                    <h2>${movie.title}</h2>
                    <p>${(movie.release_date).substring(0, 4)}</p>
                </div>
            </li>`);

            // show rating if it's for rated movie list
            if (renderFor === "Rated") {
                const ratingContainerElement = $('<div class="movie-details-user-rating"></div>');
                const ratingPanelElement = $('<div class="movie-details-rating-panel"></div>');
                const stars = renderStars("list", movie);

                ratingPanelElement.append(stars);
                ratingContainerElement.append(ratingPanelElement);
                listItem.append(ratingContainerElement);
            }

            // button to show details
            const btnShowDetails = $('<button class="show-details">Show movie details</button>');
            btnShowDetails.click(async () => {
                showDetails(movie);
            });

            // button to remove from fav/rated list 
            const btnRemove = $('<button class="btn-list-remove">Remove</button>');
            btnRemove.click(() => {
                renderFor === "Rated" ? LocalStorage.removeFrom('rated', movie) : LocalStorage.removeFrom('favourites', movie);

                App.Pagination.nowShowing--;

                if (App.Pagination.nowShowing === 0) {
                    App.Pagination.currentPage--;
                }

                renderFor === "Rated" ? listUserMovies('rated') : listUserMovies('favourites');
            });

            listItem.append(btnShowDetails, btnRemove);
            listItems.push(listItem);
        });

        listElement.append(listItems);

        // delete all button
        let btnDeleteAllText = renderFor === "Rated" ? "rated" : "favourites";
        const btnDeleteAll = $(`<button class="btn-list-delete-all">Delete all ${btnDeleteAllText}</button>`);
        btnDeleteAll.click(() => {
            renderFor === "Rated" ? LocalStorage.deleteAll('rated', listUserMovies) : LocalStorage.deleteAll('favourites', listUserMovies);
        });

        DOM.contentPanel.append(btnDeleteAll, listElement);
        hideSpinner();
    };

    // renders star panel for the user to assign rating to a movie
    const renderStars = (renderFor, movie, ratingContainer = null) => {
        let starList = [];
        for (let i = 0; i < 5; i++) {
            const star = $('<i class="fa fa-star"></i>');
            starList.push(star);
        }

        const rating = LocalStorage.getRating(movie.id);

        starList.forEach((star, index) => {
            // coloring stars for rated movies
            (rating !== 0 && rating > index) ? star.addClass("active") : star.removeClass("active");

            // star rating click event
            star.click(() => {
                let userStarRating = index + 1;
                movie.user_star_rating = userStarRating;

                const rating = LocalStorage.getRating(movie.id);

                // user rates movie for the first time inside its detail page - button to remove rating appears
                if (rating === 0 && renderFor === "detail" && ratingContainer !== null) {
                    LocalStorage.addTo('rated', movie);

                    const btnRemoveRating = $('<button class="remove-rating">Remove rating</button>');
                    btnRemoveRating.click(() => {
                        LocalStorage.removeFrom('rated', movie)
                        btnRemoveRating.remove();

                        starList.forEach((star) => {
                            star.removeClass("active");
                        });
                    });

                    ratingContainer.append(btnRemoveRating);

                    // change rating only if user clicked different amount of stars
                } else if (rating > 0 && rating !== userStarRating) {
                    LocalStorage.changeRating(movie);

                    starList.forEach((star, index2) => {
                        index >= index2 ? star.addClass("active") : star.removeClass("active");
                    });
                }
            });

            // star hover effect
            star.hover(function () { // highlight hovered stars up to the one where the cursor is
                starList.forEach((star, index2) => {
                    index >= index2 ? star.addClass("active") : star.removeClass("active");
                });
            }, function () { // get back
                const rating = LocalStorage.getRating(movie.id);

                starList.forEach((star, index2) => {
                    rating > 0 && index2 < rating ? star.addClass("active") : star.removeClass("active");
                });
            });
        });

        return starList;
    };

    // render rating panel with stars for movie detail page
    const renderRatingPanel = (movie) => {
        const ratingContainer = $('<div class="movie-details-user-rating"></div>');

        // star (rating) panel
        const ratingPanelElement = $('<div class="movie-details-rating-panel"></div>');
        const stars = renderStars("detail", movie, ratingContainer);

        ratingPanelElement.append(stars);
        ratingContainer.append(ratingPanelElement);

        // render button "remove rating" below stars if the movie is rated
        if (LocalStorage.getRating(movie.id) > 0) {
            const btnRemoveRating = $('<button class="remove-rating">Remove rating</button>');
            btnRemoveRating.click(() => {
                LocalStorage.removeFrom('rated', movie)
                btnRemoveRating.remove();

                stars.forEach((star) => {
                    star.removeClass("active");
                });
            });

            ratingContainer.append(btnRemoveRating);
        }

        return ratingContainer;
    };

    // render list of all genres for given movie and show it inside its card
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

    // render metadata of given movie and show it inside its card
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

        // runtime (in minutes)
        const runtimeElement = $(` <p class="movie-details-runtime"><strong>Length:</strong> ${movie.runtime} minutes</p>`);
        movieMetadataElement.append(runtimeElement);
        return movieMetadataElement;
    };

    // render movie credit list
    const renderMovieCredits = async (movie) => {
        const resultElement = $('<div class="movie-details-authors">');

        const credits = await fetchMovieCredits(movie.id)
        if (!credits) {
            App.fetchErrors.fetchMovieCredits = error;
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

    // helper function to create sub-elements with credits info for particular movie's credits section on page
    const appendCredits = (movieCreditsElement, creditsList, listType) => {
        if (creditsList !== undefined && creditsList.length > 0) {
            const title = listType[0].toUpperCase() + listType.slice(1).toLowerCase();

            let creditsElement = "";
            if (listType === 'actors') {
                creditsElement = $(`<p class="movie-details-${listType}"><strong>${title}:</strong></p>`);
                const actorsContainer = $('<div class="movie-actors-container"></div>');
                const actorsSpanList = renderActorsListing(creditsList);

                actorsContainer.append(actorsSpanList);
                creditsElement.append(actorsContainer);
            } else {
                creditsElement = $(`<p class="movie-details-${listType}"><strong>${title}:</strong> ${creditsList.join(', ')}</p>`);
            }
            
            movieCreditsElement.append(creditsElement);
        }
    };

    // render actor listing - each actor with link to google search
    const renderActorsListing = (actors) => {
        let actorElementList = [];
        actors.forEach((actor) => {
            let actorElement = $(`<span class="movie-actor">
                <a href="https://www.google.com/search?q=actor+${actor.split(' ').join('+')}" target="_blank">${actor}</a>
            </span>`);
            actorElementList.push(actorElement);
        });

        return actorElementList;
    };

    // assign rating class according to given rating (in %), changes movie rating's border colours
    // 0 - 39% low, 40 - 69% medium, 70 - 100% high
    const getRatingClass = (rating) => {
        return (rating < 40) ? "rating-low" : ((rating < 70) ? "rating-medium" : "rating-high");
    };

    // show detail page with detailed info about given movie
    const showDetails = async (movie) => {
        DOM.contentPanel.empty();
        DOM.pagination.remove();
        refreshErrorStatus();

        // back to listing button
        const btnBackToListing = $(`<button class="back-to-listing"><i class="fa fa-reply-all"></i>Back to movie listing</button>`);
        btnBackToListing.click(() => {

            (App.currentListing === "Search results")
                ? refreshContentPanel(`Search results for &quot;${App.currentSearchQuery}&quot`)
                : refreshContentPanel(App.currentListing);

            if (App.currentListing === "Favourites") {
                listUserMovies('favourites');
            } else if (App.currentListing === "Rated") {
                listUserMovies('rated');
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

        // rating in percentages
        const rating = Math.floor(parseFloat(movie.vote_average) * 10);
        const ratingClass = getRatingClass(rating);

        const movieDetailsRatingRowElement = $('<div class="movie-details-row"></div>');
        movieDetailsRatingRowElement.html(`
        <div class="movie-details-rating">
            <div class="${ratingClass}">${rating} %</div>
            <p>Viewer rating</p>
        </div>
        `);

        // rating panel
        const starPanel = renderRatingPanel(movie);
        movieDetailsRatingRowElement.append(starPanel);

        // add/remove from favourites
        const addToFavouritesElement = $(`<div class="movie-details-favourites"></div>`);

        // check if movie is in favourites and change addToFavourites element accordingly
        if (LocalStorage.isFavourite(movie.id)) {
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

        // add to favourites - change heart colour and show red cross upon hover
        addToFavouritesElement.click((e) => {
            if (LocalStorage.isFavourite(movie.id)) {
                LocalStorage.removeFrom('favourites', movie);

                $(e.currentTarget).find('i').removeClass('active');

            } else {
                LocalStorage.addTo('favourites', movie);

                // hover magic 
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

        // overview (movie description)
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

    // show spinner
    const showSpinner = () => {
        DOM.spinner.appendTo(DOM.contentPanel);
    };

    // hide spinner
    const hideSpinner = () => {
        DOM.spinner.remove();
    };

    // refresh pagination default values
    const refreshPagination = () => {
        App.Pagination.currentPage = 1;
        App.Pagination.maxPages = null;
        DOM.pagination.remove();
    };

    // refresh error statuses
    const refreshErrorStatus = () => {
        App.fetchErrors.fetchMovieById = null;
        App.fetchErrors.fetchMovieCredits = null;
    };

    // refresh filter default values
    const refreshFilters = () => {
        App.Filters.rating = "",
        App.Filters.genre = "",
        App.Filters.yearFrom = "",
        App.Filters.yearTo = "",
        App.Filters.country = ""
    };

    // clear all filters
    const clearAllFilters = () => {
        DOM.Filters.selectRating.val("");
        DOM.Filters.selectGenre.val("");
        DOM.Filters.selectYearFrom.val("");
        DOM.Filters.selectYearTo.val("");
        DOM.Filters.selectCountry.val("");
    };

    // refresh content panel and show heading with given title on page
    const refreshContentPanel = (title) => {
        refreshErrorStatus();
        DOM.contentPanel.empty();
        const headingElement = $(`<h2 class="content-panel-heading">${title}</h2>`);
        headingElement.appendTo(DOM.contentPanel);
    };

    // start the app when the DOM's loading is ready
    $(document).ready(() => {
        App.init();
    });
})();