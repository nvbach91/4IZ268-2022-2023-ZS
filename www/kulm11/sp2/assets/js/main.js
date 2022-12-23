(() => {

    const createMovie =  (movieTitle) => {
        const movieElement = document.createElement("li");
        const movieTitleUpdated = movieTitle.replace(' ','+').replace(':','%3A');
        
        const movieUrl = `https://www.omdbapi.com/?t=${movieTitleUpdated}&apikey=4c7468f7`;
        axios.get(movieUrl).then((resp) => {
            const movieData = resp.data;
            console.log(movieData);
            if(movieData.Response==="True"){
                movieElement.innerText = movieData.Title;
                const movieImageUrl = movieData.Poster;
                const movieImageElement = document.createElement("img");
                movieImageElement.setAttribute("src", movieImageUrl);
                movieImageElement.setAttribute("width",100);
                movieElement.appendChild(movieImageElement);
                movieList.appendChild(movieElement);
            }
        })

        return movieElement;
    }

    const bodyElement = document.querySelector("body");

    const movieList = document.createElement("ul");

    const movieForm = document.createElement("form");
    const movieTitleInput = document.createElement("input");
    movieTitleInput.setAttribute("name","name");
    movieTitleInput.setAttribute("placeholder","Movie Title");
    movieTitleInput.setAttribute("required", true);

    movieForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const movieTitle = movieTitleInput.value;
        movieElement=createMovie(movieTitle);
    })

    const movieFormSubmitButton = document.createElement("button");
    movieFormSubmitButton.innerText = "Add";

    movieForm.appendChild(movieTitleInput);
    movieForm.appendChild(movieFormSubmitButton);
    bodyElement.appendChild(movieForm);
    bodyElement.appendChild(movieList);
})()