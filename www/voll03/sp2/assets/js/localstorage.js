import { API, DOM } from './resources.js';

/**
 * Check if movie with given id is in favourites
 * @param {*} movie_id 
 * @returns true/false 
 */
export const isFavourite = (movie_id) => {
    const favList = JSON.parse(localStorage.getItem('favourites'));

    if (favList.length > 0) {
        const index = favList.findIndex(item => item.id === movie_id);
        return (index !== -1);
    }

    return false;
};

/**
 * Get user rating of movie with given id
 * @param {*} movie_id 
 * @returns 0   = movie is not rated - no rating found
 *          int = movie rating 
 */
export const getRating = (movie_id) => {
    const ratedList = JSON.parse(localStorage.getItem('rated'));

    if (ratedList.length > 0) {
        const index = ratedList.findIndex(item => item.id === movie_id);
        return (index === -1) ? 0 : ratedList[index].user_star_rating;
    }

    return 0;
};

/**
 * Change rating of a particular movie
 * @param {*} movie movie with changed rating
 */
export const changeRating = (movie) => {
    let ratedList = JSON.parse(localStorage.getItem('rated'));

    if (ratedList.length > 0) {
        let index = ratedList.findIndex(item => item.id === movie.id);

        if (index !== -1) {
            ratedList[index].user_star_rating = movie.user_star_rating;
            localStorage.setItem('rated', JSON.stringify(ratedList));
        }
    }
};

/**
 * Add movie into favourites or rated (based on type param)
 * @param {*} type 'rated' or 'favourites'
 * @param {*} movie movie to be added
 */
export const addTo = (type, movie) => {
    const movieObject = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster: API.BASE_MOVIE_POSTER + movie.poster_path
    }

    if (type === 'rated') {
        movieObject.user_star_rating = movie.user_star_rating;
    }

    let storedList = JSON.parse(localStorage.getItem(type));
    storedList.push(movieObject);

    localStorage.setItem(type, JSON.stringify(storedList));
};

/**
 * Remove movie from favourites or rated (based on type param)
 * @param {*} type 'rated' or 'favourites'
 * @param {*} movie movie to be removed
 */
export const removeFrom = (type, movie) => {
    let storedList = JSON.parse(localStorage.getItem(type));

    if (storedList.length > 0) {
        const index = storedList.findIndex(item => item.id === movie.id);

        if (index !== -1) {
            storedList.splice(index, 1);
            localStorage.setItem(type, JSON.stringify(storedList));
        }
    }
};

/**
 * Delete all movies from favourites or rated (based on type param)
 * @param {*} type 'rated' or 'favourites'
 * @param {*} callback function called after deletion (listRated or listFavourites)
 */
export const deleteAll = (type, callback) => {
    localStorage.setItem(type, JSON.stringify([]));
    DOM.pagination.remove();
    callback.apply();
};