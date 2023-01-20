$(document).ready(() => {

    const API_SEARCH_PATH = "https://imdb-api.com/API/Search/k_hq5e6t3e/";
    const API_ADVANCED_SEARCH_PATH = "https://imdb-api.com/API/AdvancedSearch/k_hq5e6t3e/";

    const form = document.querySelector("#form");
    const search = document.querySelector("#search");
    const main = document.querySelector("#main");
    const searchButton = document.querySelector("#searchButton");
    const loader = document.querySelector(".loader");
    const likedButton = document.querySelector('#likedButton');
    const sort = document.querySelector("#sort");

    getMovies(API_SEARCH_PATH + "Matrix")

    function getMovies(url) {
        loader.style.display = 'block';
        $.ajax({
            url: url,
            type: "GET",
            success: function (data) {
                displayMovies(data.results);
                loader.style.display = 'none';
            }
        });

    }

    function displayMovies(movies) {
        main.innerHTML = "";
        const temporary = document.createDocumentFragment();
        movies.forEach((movie) => {
            const { title, image, description, id } = movie;
            const moviesElement = document.createElement("div");
            moviesElement.classList.add("movie");
            let heartSrc = "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png";
            if (localStorage.getItem[id]) {
                heartSrc = "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png";
            }
            moviesElement.innerHTML = `
                <img class="movieImage" src="${image}" onerror="if (this.src != 'error.jpg') this.src = 'https://esotemp.vse.cz/~dokt00/sp2/img/default-fallback-image2.jpg';" alt="fallback">
                <img class="heartIcon" src="${heartSrc}" alt="heart" height="50" width="50" data-id="${id}">
                <div class="movie-info">
                <h3>${title}</h3>
                <div class="description">
                <h3>Description</h3>    
                <p>${description}</p>
                </div>
                </div>
            `
            temporary.appendChild(moviesElement);
        });
        main.appendChild(temporary);
        addHeartFunctionality();
    }

    function addHeartFunctionality() {
        const likedMovies = localStorage.getItem("likedMovies") ? JSON.parse(localStorage.getItem("likedMovies")) : {};
        let hearts = $(".heartIcon");
        hearts.click(function () {
            let movieId = $(this).data("id");
            let isLiked = likedMovies[movieId];
            if (!isLiked) {
                $(this).attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png");
                likedMovies[movieId] = true;
                localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
            } else {
                $(this).attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png");
                delete likedMovies[movieId];
                localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
            }
        });

        let currentMovies = $(".movie");
        currentMovies.each(function () {
            let movieId = $(this).find(".heartIcon").data("id");
            let isLiked = likedMovies[movieId];
            if (isLiked) {
                $(this).find(".heartIcon").attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png");
            } else {
                $(this).find(".heartIcon").attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png");
            }
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            console.log("enter pressed");
            e.preventDefault()
            if (sort) {
                searchVal = search.value;
                if (sort.value == "default") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_SEARCH_PATH + searchVal)
                    }
                }
                if (sort.value == "alpha,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=alpha,asc");
                    }
                }
                if (sort.value == "alpha,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=alpha,desc");
                    }
                }
                if (sort.value == "usr,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=user_rating,desc");
                    }
                }
                if (sort.value == "usr,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=user_rating,asc");
                    }
                }
                if (sort.value == "votes,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=num_votes,desc");
                    }
                }
                if (sort.value == "release,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=release_date,desc");
                    }
                }
                if (sort.value == "release,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=release_date,asc");
                    }
                }

            } else {
                const searchVal = search.value
                if (searchVal && searchVal != "") {
                    getMovies(API_SEARCH_PATH + searchVal)
                }
            }
        })
    }
    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            console.log("click");
            e.preventDefault()
            if (sort) {
                searchVal = search.value;
                if (sort.value == "default") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_SEARCH_PATH + searchVal)
                    }
                }
                if (sort.value == "alpha,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&num_votes=300," + "&sort=alpha,asc");
                    }
                }
                if (sort.value == "alpha,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&num_votes=300," + "&sort=alpha,desc");
                    }
                }
                if (sort.value == "usr,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=user_rating,desc");
                    }
                }
                if (sort.value == "usr,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=user_rating,asc");
                    }
                }
                if (sort.value == "votes,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=num_votes,desc");
                    }
                }
                if (sort.value == "release,desc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=release_date,desc");
                    }
                }
                if (sort.value == "release,asc") {
                    if (searchVal && searchVal != "") {
                        getMovies(API_ADVANCED_SEARCH_PATH + "?title=" + searchVal + "&title_type=feature,tv_movie" + "&num_votes=300," + "&sort=release_date,asc");
                    }
                }

            } else {
                const searchVal = search.value
                if (searchVal && searchVal != "") {
                    getMovies(API_SEARCH_PATH + searchVal)
                }
            }
        })
    }
    if (likedButton) {
        likedButton.addEventListener("click", (e) => {
            e.preventDefault()
            displayMovies(localStorage.getItem("likedMovies") ? JSON.parse(localStorage.getItem("likedMovies")) : {});
        })

    }
});

