import { API, DOM } from './resources.js';

export const LocalStorage = {
    favouritesList: [],
    ratedList: [],
    /**
     * Init function - checks if local storage is set on app start
     */
    init: function () {
        const localFavList = localStorage.getItem('favourites');
        const localRatedList = localStorage.getItem('rated');

        if (localFavList === null) {
            localStorage.setItem('favourites', []);
            this.favouritesList = [];
        } else {
            this.favouritesList = JSON.parse(localFavList);
        }

        if (localRatedList === null) {
            localStorage.setItem('rated', []);
            this.ratedList = [];
        } else {
            this.ratedList = JSON.parse(localRatedList);
        }
    },
    /**
     * Check if movie with given id is in favourites
     * @param {*} movie_id 
     * @returns true/false 
     */
    isFavourite: function (movie_id) {
        if (this.favouritesList.length > 0) {
            const index = this.favouritesList.findIndex(item => item.id === movie_id);
            return (index !== -1);
        }

        return false;
    },
    /**
    * Get user rating of movie with given id
    * @param {*} movie_id 
    * @returns 0   = movie is not rated - no rating found
    *          int = movie rating 
    */
    getRating: function (movie_id) {
        if (this.ratedList.length > 0) {
            const index = this.ratedList.findIndex(item => item.id === movie_id);
            return (index === -1) ? 0 : this.ratedList[index].user_star_rating;
        }

        return 0;
    },
    /**
    * Change rating of a particular movie
    * @param {*} movie movie with changed rating
    */
    changeRating: function (movie) {
        if (this.ratedList.length > 0) {
            let index = this.ratedList.findIndex(item => item.id === movie.id);

            if (index !== -1) {
                this.ratedList[index].user_star_rating = movie.user_star_rating;
                localStorage.setItem('rated', JSON.stringify(this.ratedList));
            }
        }
    },
    /**
    * Add movie into favourites or rated (based on type param)
    * @param {*} type 'rated' or 'favourites'
    * @param {*} movie movie to be added
    */
    addTo: function (type, movie) {
        const movieObject = {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster: API.BASE_MOVIE_POSTER + movie.poster_path
        }

        if (type === 'rated') {
            movieObject.user_star_rating = movie.user_star_rating;
            this.ratedList.push(movieObject);
            localStorage.setItem('rated', JSON.stringify(this.ratedList));
        } else {
            this.favouritesList.push(movieObject);
            localStorage.setItem('favourites', JSON.stringify(this.favouritesList));
        } 
    },
    /**
    * Remove movie from favourites or rated (based on type param)
    * @param {*} type 'rated' or 'favourites'
    * @param {*} movie movie to be removed
    */
    removeFrom: function (type, movie) {
        if (type === 'rated' && this.ratedList.length > 0) {
            const index = this.ratedList.findIndex(item => item.id === movie.id);

            if (index !== -1) {
                this.ratedList.splice(index, 1);
                localStorage.setItem('rated', JSON.stringify(this.ratedList));
            }
        } else if (this.favouritesList.length > 0) {
            const index = this.favouritesList.findIndex(item => item.id === movie.id);

            if (index !== -1) {
                this.favouritesList.splice(index, 1);
                localStorage.setItem('favourites', JSON.stringify(this.favouritesList));
            }
        }
    },
    /**
    * Delete all movies from favourites or rated (based on type param)
    * @param {*} type 'rated' or 'favourites'
    * @param {*} callback function called after deletion (listRated or listFavourites)
    */
    deleteAll: function (type, callback) {
        if (type === 'rated') {
            this.ratedList = [];
            localStorage.setItem('rated', JSON.stringify(this.ratedList));
        } else {
            this.favouritesList = [];
            localStorage.setItem('favourites', JSON.stringify(this.favouritesList));
        }

        DOM.pagination.remove();
        callback.apply();
    }
};