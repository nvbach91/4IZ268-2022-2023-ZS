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
        currentMovieList: [],
        init: function () {

            DOM.searchForm.submit((e) => {
                e.preventDefault();
            });

            // test API
            listLatest();
        }
    };

    // DOM object
    const DOM = {
        searchForm: $('.movie-searchbar'),
        contentPanel: $('.content-panel')
    }

    // API strings
    const API_STRINGS = {
        BASE: "https://api.themoviedb.org/3/",
        KEY: "3ac4c22045a1dcb03ef960d46c30d0a2",
        NEWEST: "movie/now_playing?api_key="
    };

    // functions
    const renderMovieCard = (movie) => { };

    const renderMovieListing = (movieList) => { };

    const fetchMovie = (title) => { };

    const listFiltered = (params) => {};

    const listLatest = () => {
        let url = API_STRINGS.BASE + API_STRINGS.NEWEST + API_STRINGS.KEY;
        console.log(url);
/*
        axios.get(url).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log("error");
        });*/
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

    const showSpinner = () => { };

    const hideSpinner = () => { };

    const showPagination = (movies) => { };

    $(document).ready(() => {
        App.init();
    });
})();