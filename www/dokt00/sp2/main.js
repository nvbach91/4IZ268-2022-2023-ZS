const APIKEY = "k_fpisjvd2";
const APIURL = "https://imdb-api.com/API/MostPopularMovies/k_fpisjvd2";

const APISEARCHPATH = "https://imdb-api.com/API/SearchTitle/k_fpisjvd2/";
const APIIMGPATH = "https://imdb-api.com/API/Posters/k_fpisjvd2/";

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData);

    return respData;
}

getMovies();
