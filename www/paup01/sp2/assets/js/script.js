$(document).ready(() => {

    const api = "api_key=cf36d17a1586a57e3524afefaa2e2b21";
    const API_Movie_Search = `https://api.themoviedb.org/3/search/movie?${api}&query=`;
    const poster = `https://image.tmdb.org/t/p/original`;

    const API_Movie_Generator = `https://api.themoviedb.org/3/discover/movie?${api}`;

    const form = document.querySelector("#searchForm");
    const search = document.querySelector("#search");
    const searchButton = document.querySelector("#searchButton");
    const generateButton = document.querySelector("#generateButton");
    const findFavoritesButton = document.querySelector("#findFavoritesButton");
    const main = document.querySelector("#main");
    const spinner = document.querySelector(".spinner");
    const sort = document.querySelector("#sorter");
    const errorPopUp = document.querySelector(".error-pop-up");
    const errorPopUp2 = document.querySelector(".error-pop-up2");
    const errorPopUp3 = document.querySelector(".error-pop-up3");
    const favMov = document.querySelector(".favMov");

    function findMovies(url) {
        spinner.style.display = 'inline-block';
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                showMovies(data.results);
                spinner.style.display = 'none';
                getResponse(data);

            }
        });
    };

    function showMovies(movies) {
        main.innerHTML = "";
        const temporary = document.createDocumentFragment();
        movies.forEach((movie) => {
            const { title, poster_path, overview, id } = movie;
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            let iconSrc = "./assets/img/star2.png";
            if (localStorage.getItem(id) === "true") {
                if (localStorage.getItem[id]) {
                    iconSrc = "./assets/img/star1.png";
                }
            }
            movieElement.innerHTML = `
                <img class="moviePoster" src="${poster}${poster_path}" alt="${title}" >
                <img class="favoriteIcon" src="${iconSrc}" alt="favoriteIcon" height="30" width="30" data-id="${id}">
                <div class="movieDescription">
                    <h3>${title}</h3>
                    <div class="description">
                        <h3 class="desc">Short description</h3>
                        <p>${overview}</p>
                    </div>
                </div>
            `
            temporary.appendChild(movieElement);
        });
        main.appendChild(temporary);
        addSaving();
    };

    function addSaving() {
        const savedMovies = localStorage.getItem("savedMovies") ? JSON.parse(localStorage.getItem("savedMovies")) : {};
        let favorites = $(".favoriteIcon");
        favorites.click(function () {
            let movieId = $(this).data("id");
            let isSaved = savedMovies[movieId];
            if (!isSaved) {
                $(this).attr("src", "./assets/img/star1.png");
                savedMovies[movieId] = true;
                localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
            } else {
                $(this).attr("src", "./assets/img/star2.png");
                delete savedMovies[movieId];
                localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
            }
        });

        let visibleMovies = $(".movie");
        visibleMovies.each(function () {
            let movieId = $(this).find(".favoriteIcon").data("id");
            let isSaved = savedMovies[movieId];
            if (isSaved) {
                $(this).find(".favoriteIcon").attr("src", "./assets/img/star1.png");
            } else {
                $(this).find(".favoriteIcon").attr("src", "./assets/img/star2.png");
            }
        });
    };


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const searchVal = search.value
            if (searchVal && searchVal != "") {
                findMovies(API_Movie_Search + searchVal)
            } else {
                errorPopUp.style.display = "block"
                function hidePopUp() {
                    errorPopUp.style.display = "none";
                }
                setTimeout(hidePopUp, 1500)
            }
        })
    }

    if (searchButton) {
        searchButton.addEventListener("submit", (e) => {
            e.preventDefault()
            const searchVal = search.value
            if (searchVal && searchVal != "") {
                findMovies(API_Movie_Search + searchVal)
            } else {
                errorPopUp.style.display = "block"
                function hidePopUp() {
                    errorPopUp.style.display = "none";
                }
                setTimeout(hidePopUp, 1500)
            }
        })
    }

    if (generateButton) {
        generateButton.addEventListener("click", (e) => {
            e.preventDefault()
            if (sort.value == "default") {
                findMovies(API_Movie_Generator + "&sort_by=popularity.desc")

            }
            if (sort.value == "alphabeticalA") {
                findMovies(API_Movie_Generator + "&sort_by=original_title.desc")

            }
            if (sort.value == "alphabeticalZ") {
                findMovies(API_Movie_Generator + "&sort_by=original_title.asc")

            }
            if (sort.value == "releaseNew") {
                findMovies(API_Movie_Generator + "&sort_by=release_date.desc")

            }
            if (sort.value == "releaseOld") {
                findMovies(API_Movie_Generator + "&sort_by=release_date.asc")

            } /* else {
                    errorPopUp2.style.display="block"
                    function hidePopUp2(){
                        errorPopUp2.style.display="none";
                    } setTimeout (hidePopUp2,1500)
                }*/


        })

    }

    if (findFavoritesButton) {
        findFavoritesButton.addEventListener("click", (e) => {
            e.preventDefault()
            const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
            const savedMoviesList = Object.keys(savedMovies);
            for (var i = 0; i < savedMoviesList.length; i++) {
                const API_Find_By_ID = `https://api.themoviedb.org/3/movie/${savedMoviesList[i]}?${api}`;
                $.ajax({
                    url: API_Find_By_ID,
                    method: 'GET',
                    success: function (data) {
                        console.log(data);
                        spinner.style.display = 'none';
                        const title = document.createElement("div");
                        title.classList.add("title");
                        title.innerHTML = `<div>${data.title}</div>`;
                        main.appendChild(title);
                    }
                })


            }
            // const movieElement = document.createElement("div");
            // movieElement.classList.add("movie");
            // let iconSrc = "./assets/img/star2.png";
            // if (localStorage.getItem(id) === "true") {
            //     if (localStorage.getItem[id]) {
            //         iconSrc = "./assets/img/star1.png";
            //     }
            // }
            // movieElement.innerHTML = `
            //     <img class="moviePoster" src="${poster}${poster_path}" alt="${title}" >
            //     <img class="favoriteIcon" src="${iconSrc}" alt="favoriteIcon" height="30" width="30" data-id="${id}">
            //     <div class="movieDescription">
            //         <h3>${title}</h3>
            //         <div class="description">
            //             <h3 class="desc">Short description</h3>
            //             <p>${overview}</p>
            //         </div>
            //     /* findMovies(`https://api.themoviedb.org/3/movie/${savedMoviesList[i]}?${api}`); */


            // const results = 
            //     Promise.all(movies.map(id => Axios(`https://api.themoviedb.org/3/movie/${savedMoviesList[i]}?${api}`)))
            // .then(results) => {
            // do something with the results reeeeeeeeeeeeeeeeeeeeee 
            /* }; */

            //console.log(i + ". " + savedMoviesList[i]);
            // savedMoviesList.every(findMovies)
            // findMovies(`https://api.themoviedb.org/3/movie/${value}?${api}`)
            // for (var i = 0; i < localStorage.length; i++) {
            //     console.log(url)
            // };

            // const API_Find_By_ID = `https://api.themoviedb.org/3/movie/${savedMoviesList[i]}?${api}`;
            // forEach
            // findMovies(API_Find_By_ID)
            // console.log(findMovies);
            //             

            //             const savedMoviesList = [];
            //             for (const id in savedMovies) {
            //             savedMoviesList.push(savedMovies[id]);
            //             console.log(savedMoviesList);
            // }
            // 
            // console.log(showMovies(savedMovies));
            // console.log(localStorage.getObj(key));
            //showMovies(localStorage.getItem("savedMovies")? JSON.parse(localStorage.getItem("savedMovies")) : {});
        })

    }
});