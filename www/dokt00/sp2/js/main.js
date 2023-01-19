$(document).ready(() => {

    const APISEARCHPATH = "https://imdb-api.com/API/Search/k_fpisjvd2/";

    const form = document.getElementById("form");
    const search = document.getElementById("search");
    const main = document.getElementById("main");

    getMovies(APISEARCHPATH + "Matrix");

    function getMovies(url) {
        document.querySelector('.loader').style.display = 'block';
        $.ajax({
            url: url,
            type: "GET",
            success: function (data) {
                displayMovies(data.results);
                document.querySelector('.loader').style.display = 'none';
            }
        });
    }

    function displayMovies(movies) {
        main.innerHTML = "";
        movies.forEach((movie) => {
            const { title, image, description, id } = movie;
            const moviesElement = document.createElement("div");
            moviesElement.classList.add("movie");
            let heartSrc = "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png";
            if (localStorage.getItem(id) === "true") {
                heartSrc = "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png";
            }
            moviesElement.innerHTML = `
        <img class="movie-image" src="${image}" alt="${title}" />
        <img class="heart-icon" src="${heartSrc}" alt="heart" height="50px" width="50px" data-id="${id}">
        <div class="movie-info">
        <h3>${title}</h3>
        <div class="description">
        <h3>Description</h3>
        <p>${description}</p>
        </div>
        </div>
        `
            main.appendChild(moviesElement);
        });
        addHeartFunctionality();
    }

    function addHeartFunctionality() {
        var hearts = $(".heart-icon");
        hearts.click(function () {
            var movieId = $(this).data("id");
            var isLiked = localStorage.getItem(movieId) === "true";
            if (!isLiked) {
                $(this).attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png");
                localStorage.setItem(movieId, "true");
            } else {
                $(this).attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png");
                localStorage.removeItem(movieId);
            }
        });

        var currentMovies = $(".movie");
        currentMovies.each(function () {
            var movieId = $(this).find(".heart-icon").data("id");
            let isLiked = localStorage.getItem(movieId) === "true";
            if (isLiked) {
                $(this).find(".heart-icon").attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIconRed.png");
            } else {
                $(this).find(".heart-icon").attr("src", "https://esotemp.vse.cz/~dokt00/sp2/img/heartIcon.png");
            }
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const searchVal = search.value
            if (searchVal && searchVal != "") {
                getMovies(APISEARCHPATH + searchVal)
            } else {
                window.location.reload()
            }
        })
    }
});

