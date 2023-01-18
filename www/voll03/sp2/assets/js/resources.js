/**
 * DOM object - for manipulation with various HTML page elements
 */
 export const DOM = {
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
    btnApplyFilters: $('#btn-apply-filters'),
    contentWrapper: $('.content-wrapper'),
    contentPanel: $('.content-panel'),
    pagination: $('.pagination'),
    spinner: $('<div class="spinner">')
}

/**
 * API object - used to build URL strings for API calls
 */
 export const API = {
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

/************************************************************************************* 
 * Fetch functions
 *************************************************************************************/

/**
 * Get list of all genres from the API
 * @returns array of all genre objects, each genre has its id and name | false
 */
export const fetchGenres = async () => {
    const url = API.BASE + API.GENRE_LIST + API.KEY;

    return await axios.get(url).then((response) => {
        return response.data.genres;
    }).catch((error) => {
        return false;
    });
};

/**
 * Get list of all countries from the API
 * @returns array of all country objects | false
 */
export const fetchCountries = async () => {
    const url = API.BASE + API.COUNTRY_LIST + API.KEY;

    return await axios.get(url).then((response) => {
        return response.data;
    }).catch((error) => {
        return false;
    });
};

/**
 * Get info about specific movie from the API
 * @param {*} id id of movie to be fetched
 * @returns movie object with info | false
 */
export const fetchMovieById = async (id) => {
    const url = API.BASE + `movie/${id}` + API.KEY;

    return await axios.get(url).then((response) => {
        return response.data;
    }).catch((error) => {
        return false;
    });
}; 

/**
 * Get info about credits of a specific movie from the API
 * @param {*} movie_id id of movie to get credits from
 * @returns credits object with info | false
 */
export const fetchMovieCredits = async (movie_id) => {
    const url = API.BASE + `/movie/${movie_id}/credits` + API.KEY + "&sort=popularity";

    return await axios.get(url).then((response) => {
        return response.data;
    }).catch((error) => {
        return false;
    });
};