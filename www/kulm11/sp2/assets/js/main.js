(() => {

    const createMovie = (movieTitle, watched, userRating) => {
        const movieElement = document.createElement("li");
        const localStorageUnwatched = JSON.parse(localStorage.getItem("unwatchedList") || "[]");
        movieElement.setAttribute("class", "movie");
        const movieTitleUpdated = movieTitle.replace(' ', '+').replace(':', '%3A');
        movieTitleInput.value = "";
        const movieUrl = `https://www.omdbapi.com/?t=${movieTitleUpdated}&apikey=4c7468f7`;
        spinner.classList.remove("hidden");
        axios.get(movieUrl).then((resp) => {
            const movieData = resp.data;
            if (movieData.Response === "True") {
                if (!JSON.stringify(moviesUnwatchedIdList).includes(JSON.stringify(movieData.imdbID)) && !JSON.stringify(moviesWatchedIdList).includes(JSON.stringify(movieData.imdbID))) {
                    moviesUnwatchedIdList[moviesUnwatchedIdList.length] = { data: movieData, html: movieElement, filterStatus: [true, true, true, true, true] };
                    if (!localStorageUnwatched.includes(moviesUnwatchedIdList[moviesUnwatchedIdList.length - 1].data.Title)) {
                        localStorageUnwatched.push(moviesUnwatchedIdList[moviesUnwatchedIdList.length - 1].data.Title);
                    }
                    localStorage.setItem('unwatchedList', JSON.stringify(localStorageUnwatched));
                    console.log(localStorage.getItem("unwatchedList"));
                    const movieName = document.createElement("h3");
                    movieName.innerHTML = movieData.Title;
                    const movieInfo = document.createElement("p");
                    movieInfo.innerHTML =`<strong>Year</strong>: ${movieData.Year}<br><br><strong>IMDb rating</strong>: ${movieData.imdbRating}`;
                    const movieImageUrl = movieData.Poster;
                    const movieImageElement = document.createElement("img");
                    movieImageElement.setAttribute("src", movieImageUrl);
                    movieImageElement.setAttribute("alt", movieData.Title);
                    movieImageElement.setAttribute("width", 100);
                    const movieRemoveButton = document.createElement("button");
                    movieRemoveButton.setAttribute("class", "removeButton");
                    movieRemoveButton.innerText = "Remove";
                    movieRemoveButton.addEventListener("click", () => {
                        movieElement.remove();
                        removeItem(moviesUnwatchedIdList, movieData);
                        var index = localStorageUnwatched.indexOf(movieData.Title);
                        if (index > -1) {
                            localStorageUnwatched.splice(index, 1);
                        }
                        localStorage.setItem('unwatchedList', JSON.stringify(localStorageUnwatched));
                        console.log(localStorage.getItem("unwatchedList"));
                    })

                    const movieWatchedButton = document.createElement("button");
                    movieWatchedButton.innerText = "Watched";
                    movieWatchedButton.setAttribute("class", "watchedButton");
                    movieWatchedButton.addEventListener("click", () => {
                        listItemTransport(movieElement, movieData, userRating);
                    })

                    movieElement.appendChild(movieImageElement);
                    movieElement.appendChild(movieName);
                    movieElement.appendChild(movieInfo);
                    movieElement.appendChild(movieRemoveButton);
                    movieElement.appendChild(movieWatchedButton);
                    movieListUnwatched.appendChild(movieElement);
                    if (watched) {
                        listItemTransport(movieElement, movieData, userRating);
                    }
                }
                spinner.classList.add("hidden");
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        return movieElement;
    }
    const bodyElement = document.querySelector("body");
    const row1 = document.createElement("div");
    row1.setAttribute("id", "row1");
    const row2 = document.createElement("div");
    row2.setAttribute("id", "row2");
    const col1 = document.createElement("div");
    col1.setAttribute("id", "col1");
    const col2 = document.createElement("div");
    col2.setAttribute("id", "col2");

    const movieListUnwatched = document.createElement("ul");
    movieListUnwatched.setAttribute("id", "unwatchedList");
    const listUnwatchedTitle = document.createElement("h2");
    listUnwatchedTitle.innerHTML = "Unwatched";
    const movieListWatched = document.createElement("ul");
    movieListWatched.setAttribute("id", "watchedList");
    const listWatchedTitle = document.createElement("h2");
    listWatchedTitle.innerHTML = "Watched";
    const filtersTitle = document.createElement("h2");
    filtersTitle.innerHTML = "Filters";
    const filters = document.createElement("ul");
    filters.setAttribute("id", "filters");

    const filterWatched = document.createElement("li");
    filterWatched.setAttribute("class", "filter");
    const filterWatchedDescription = document.createElement("p");
    filterWatchedDescription.innerHTML = "Watched:";
    const filterWatchedValue = document.createElement("select");
    filterWatchedValue.addEventListener("change", () => {
        if (filterWatchedValue.value === "watched") {
            moviesUnwatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = false;
                checkHidden(movie.html, movie.filterStatus);
            });
            moviesWatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = true;
                checkHidden(movie.html, movie.filterStatus);
            });
        }

        if (filterWatchedValue.value === "unwatched") {
            moviesWatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = false;
                checkHidden(movie.html, movie.filterStatus);
            });
            moviesUnwatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = true;
                checkHidden(movie.html, movie.filterStatus);
            });
        }

        if (filterWatchedValue.value === "---") {
            moviesUnwatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = true;
                checkHidden(movie.html, movie.filterStatus);
            });
            moviesWatchedIdList.forEach((movie) => {
                movie.filterStatus[0] = true;
                checkHidden(movie.html, movie.filterStatus);
            });
        }
    })
    filterWatchedValue.innerHTML = '<option value="---">---</option><option value="watched">Watched</option><option value="unwatched">Unwatched</option>';

    const filterUserRating = document.createElement("li");
    filterUserRating.setAttribute("class", "filter");
    const filterUserRatingDescription = document.createElement("p");
    filterUserRatingDescription.innerHTML = "My rating:";
    const filterUserRatingValue = document.createElement("input");
    filterUserRatingValue.addEventListener("change", () => {
        moviesWatchedIdList.forEach((movie) => {
            if (Number(movie.userRating.value) < Number(filterUserRatingValue.value)) {
                movie.filterStatus[1] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[1] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
        });

    })
    filterUserRatingValue.setAttribute("type", "number");
    filterUserRatingValue.setAttribute("min", 0);
    filterUserRatingValue.setAttribute("max", 100);
    filterUserRatingValue.setAttribute("value", 0);

    const filterIMDbRating = document.createElement("li");
    filterIMDbRating.setAttribute("class", "filter");
    const filterIMDbRatingDescription = document.createElement("p");
    filterIMDbRatingDescription.innerHTML = "IMDb rating:";
    const filterIMDbRatingValue = document.createElement("input");
    filterIMDbRatingValue.addEventListener("change", () => {
        moviesWatchedIdList.forEach((movie) => {
            if (Number(movie.data.imdbRating) < Number(filterIMDbRatingValue.value)) {
                movie.filterStatus[2] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[2] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
        });
        moviesUnwatchedIdList.forEach((movie) => {
            if (Number(movie.data.imdbRating) < Number(filterIMDbRatingValue.value)) {
                movie.filterStatus[2] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[2] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
        });

    })
    filterIMDbRatingValue.setAttribute("type", "number");
    filterIMDbRatingValue.setAttribute("min", 0);
    filterIMDbRatingValue.setAttribute("max", 10);
    filterIMDbRatingValue.setAttribute("value", 0);

    const filterYear = document.createElement("li");
    filterYear.setAttribute("class", "filter");
    const filterYearDescription = document.createElement("p");
    filterYearDescription.innerHTML = "Year:";
    const filterYearValue = document.createElement("input");
    filterYearValue.addEventListener("change", () => {
        moviesWatchedIdList.forEach((movie) => {
            if (Number(movie.data.Year) < Number(filterYearValue.value)) {
                movie.filterStatus[3] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[3] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
        });
        moviesUnwatchedIdList.forEach((movie) => {
            if (Number(movie.data.Year) < Number(filterYearValue.value)) {
                movie.filterStatus[3] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[3] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
        });

    })
    filterYearValue.setAttribute("type", "number");
    filterYearValue.setAttribute("min", 1888);
    const currentYear = new Date().getFullYear();
    filterYearValue.setAttribute("max", currentYear + 20);
    filterYearValue.setAttribute("value", 1888);

    const filterMovieTitle = document.createElement("li");
    filterMovieTitle.setAttribute("class", "filter");
    const filterMovieTitleDescription = document.createElement("p");
    filterMovieTitleDescription.innerHTML = "Search:";
    const filterMovieTitleValue = document.createElement("input");
    filterMovieTitleValue.addEventListener("input", () => {
        moviesUnwatchedIdList.forEach((movie) => {
            if (movie.data.Title.toLowerCase().includes(filterMovieTitleValue.value.toLowerCase())) {
                movie.filterStatus[4] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[4] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
        });
        moviesWatchedIdList.forEach((movie) => {
            if (movie.data.Title.toLowerCase().includes(filterMovieTitleValue.value.toLowerCase())) {
                movie.filterStatus[4] = true;
                checkHidden(movie.html, movie.filterStatus);
            }
            else {
                movie.filterStatus[4] = false;
                checkHidden(movie.html, movie.filterStatus);
            }
        });
    })
    filterMovieTitleValue.setAttribute("name", "name");
    filterMovieTitleValue.setAttribute("placeholder", "Movie Title");


    function removeItem(arr, value) {
        var index = arr.map(e => e.data).indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function addWatchedMovie(movieData, movieHTML, userRating) {
        movieListWatched.appendChild(movieHTML);
        const movieRating = movieHTML.querySelector("input");
        movieRating.setAttribute("value", userRating);
        moviesWatchedIdList[moviesWatchedIdList.length] = { data: movieData, html: movieHTML, userRating: movieRating, filterStatus: [true, true, true, true, true] };
    }

    function listItemTransport(newMovieElement, movieData, userRating) {
        const movieRemoveButton = newMovieElement.querySelector(".removeButton");
        movieRemoveButton.remove();
        const movieWatchedButton = newMovieElement.querySelector(".watchedButton");
        movieWatchedButton.remove();
        const movieRating = document.createElement("input");
        movieRating.setAttribute("type", "number");
        movieRating.setAttribute("min", 0);
        movieRating.setAttribute("max", 100);

        const localStorageWatched = JSON.parse(localStorage.getItem("watchedList") || "[]");
        movieRating.addEventListener(("change"), () => {
            localStorageWatched.forEach((item) => {
                if (item.title === movieData.Title) {
                    item.userRating = movieRating.value;
                }
            });
            localStorage.setItem('watchedList', JSON.stringify(localStorageWatched));
            console.log(localStorage.getItem("watchedList"));
        });

        newMovieElement.appendChild(movieRating);
        removeItem(moviesUnwatchedIdList, movieData);
        addWatchedMovie(movieData, newMovieElement, userRating);
        const movieInfo = newMovieElement.querySelector("p");
        movieInfo.innerHTML = movieInfo.innerHTML + "<br><br><strong>My rating</strong>:";

        const localStorageUnwatched = JSON.parse(localStorage.getItem("unwatchedList") || "[]");
        var index = localStorageUnwatched.indexOf(movieData.Title);
        if (index > -1) {
            localStorageUnwatched.splice(index, 1);
        }
        localStorage.setItem('unwatchedList', JSON.stringify(localStorageUnwatched));
        console.log(localStorage.getItem("unwatchedList"));

        //const localStorageWatched = JSON.parse(localStorage.getItem("watchedList") || "[]");
        if (!JSON.stringify(localStorageWatched).includes(JSON.stringify({ title: movieData.Title, userRating: userRating }))) {
            localStorageWatched.push({ title: movieData.Title, userRating: userRating });
        }
        localStorage.setItem('watchedList', JSON.stringify(localStorageWatched));
        console.log(localStorage.getItem("watchedList"));
    }

    function checkHidden(movieHTML, filterStatus) {
        let hiddenStatus = true;
        filterStatus.forEach((filter) => {
            if (!filter) {
                hiddenStatus = false;
            }
        });
        if (hiddenStatus) {
            movieHTML.classList.remove("hidden");
        }
        else {
            movieHTML.classList.add("hidden");
        }
    }

    const moviesUnwatchedIdList = [];
    const moviesWatchedIdList = [];

    const movieForm = document.createElement("form");
    const movieTitleInput = document.createElement("input");
    movieTitleInput.setAttribute("name", "name");
    movieTitleInput.setAttribute("placeholder", "Movie Title");
    movieTitleInput.setAttribute("required", true);

    movieForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const movieTitle = movieTitleInput.value;
        movie = createMovie(movieTitle, false, 50);
    })

    const movieFormSubmitButton = document.createElement("button");
    movieFormSubmitButton.innerText = "Add";

    const spinner = document.createElement("div");
    spinner.setAttribute("id","spinner");
    spinner.classList.add("hidden")

    movieForm.appendChild(movieTitleInput);
    movieForm.appendChild(movieFormSubmitButton);

    row1.appendChild(movieForm);
    row1.appendChild(spinner);

    col1.appendChild(listUnwatchedTitle);
    col1.appendChild(movieListUnwatched);
    col1.appendChild(listWatchedTitle);
    col1.appendChild(movieListWatched);

    col2.appendChild(filtersTitle);
    filterWatched.appendChild(filterWatchedDescription);
    filterWatched.appendChild(filterWatchedValue);
    filterUserRating.appendChild(filterUserRatingDescription);
    filterUserRating.appendChild(filterUserRatingValue);
    filterIMDbRating.appendChild(filterIMDbRatingDescription);
    filterIMDbRating.appendChild(filterIMDbRatingValue);
    filterMovieTitle.appendChild(filterMovieTitleDescription);
    filterMovieTitle.appendChild(filterMovieTitleValue);
    filterYear.appendChild(filterYearDescription);
    filterYear.appendChild(filterYearValue);
    filters.appendChild(filterWatched);
    filters.appendChild(filterUserRating);
    filters.appendChild(filterIMDbRating);
    filters.appendChild(filterYear);
    filters.appendChild(filterMovieTitle);
    col2.appendChild(filters);

    row2.appendChild(col1);
    row2.appendChild(col2);

    bodyElement.appendChild(row1);
    bodyElement.appendChild(row2);

    const localStorageUnwatched = JSON.parse(localStorage.getItem("unwatchedList"));
    const localStorageWatched = JSON.parse(localStorage.getItem("watchedList"));
    if (localStorageUnwatched != null) {
        localStorageUnwatched.forEach((movie) => {
            createMovie(movie);
        });
    }
    if (localStorageWatched != null) {
        localStorageWatched.forEach((movie) => {
            const newMovie = createMovie(movie.title, true, movie.userRating);
        });
    }
})()