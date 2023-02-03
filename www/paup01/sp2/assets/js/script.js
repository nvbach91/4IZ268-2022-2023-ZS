$(document).ready(() => {

    const api = "api_key=cf36d17a1586a57e3524afefaa2e2b21";
    const API_Movie_Search = `https://api.themoviedb.org/3/search/movie?${api}&query=`;
    const poster = `https://image.tmdb.org/t/p/original`;

    const API_Movie_Generator = `https://api.themoviedb.org/3/discover/movie?${api}`;

    const form = document.querySelector("#searchForm");
    const search = document.querySelector("#search");
    const searchButton = document.querySelector("#searchButton");
    const generateButton = document.querySelector("#generateButton");
    const main = document.querySelector("#main");
    const spinner = document.querySelector(".spinner");
    const sort = document.querySelector("#sorter");
    const errorPopUp = document.querySelector(".error-pop-up");
    const errorPopUp2 = document.querySelector(".error-pop-up2");
    const favoriteIcon = document.querySelector('#favoriteIcon');

    function findMovies (url) {
        spinner.style.display = 'inline-block';
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                showMovies(data.results);
                spinner.style.display = 'none';
            }
        });
    };

    

    function showMovies(movies) {
        main.innerHTML = "";
        const temporary = document.createDocumentFragment();
        movies.forEach((movie) => {
            const {title, poster_path, overview, id } = movie;
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            let IconSrc = "./assets/img/star2.png";
            if (localStorage.getItem(id) === "true") {
                if (localStorage.getItem[id]) {
                    heartSrc = "./assets/img/star1.png";
                }
            }
            movieElement.innerHTML = `
                <img class="moviePoster" src="${poster}${poster_path}" alt="${title}" />
                <img class="favoriteIcon" src="${heartSrc}" alt="heart" height="30px" width="30px" data-id="${id}">
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

    function addSaving(){
        //todo
    };

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const searchVal = search.value
            if (searchVal && searchVal != "") {
                findMovies(API_Movie_Search + searchVal)
            } else {
                errorPopUp.style.display="block"
                function hidePopUp(){
                    errorPopUp.style.display="none";
                } setTimeout (hidePopUp,1500)
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
                errorPopUp.style.display="block"
                function hidePopUp(){
                    errorPopUp.style.display="none";
                } setTimeout (hidePopUp,1500)
            }
        })
    }

    if (generateButton) {
        generateButton.addEventListener("submit", (e) => {
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
                        
                } else {
                    errorPopUp2.style.display="block"
                function hidePopUp(){
                    errorPopUp2.style.display="none";
                } setTimeout (hidePopUp,1500)
                }
            
            
        })
    
    }
});