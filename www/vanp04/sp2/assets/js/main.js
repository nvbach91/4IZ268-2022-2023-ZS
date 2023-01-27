(() => {

    var sortByAnime = 'rating';

    var animeListType = 'seasonal';

    var achivementListType = 'pve';

    const weatherApiKey = 'd822d92d17f1191d591f47a6ef8b901f';

    const weatherCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const weatherHourUrl = 'https://api.openweathermap.org/data/2.5/forecast'

    const animeCurrentSeasonUrl = 'https://api.jikan.moe/v4/seasons/now';

    const achievementsDailyUrl = 'https://api.guildwars2.com/v2/achievements/daily';

    const achievementsUrl = 'https://api.guildwars2.com/v2/achievements';

    const animeContentElementWrapper = $('#anime-content-wrapper');

    const achievementsContentElementWrapper = $('#achievements-content-wrapper');

    const currentWeatherElementWrapper = $('#weather-content-left-wrapper');

    const hourlyWeatherElementWrapper = $('#weather-content-right-wrapper');

    const weatherButton = $('#weather-button');

    const spinnerAchivements = $('<span class="loader-ach"></span>');
    const spinnerAnime = $('<span class="loader-an"></span>');
    const spinnerWeatherC = $('<span class="loader-wc"></span>');
    const spinnerWeatherH = $('<span class="loader-wh"></span>');

    const animeButtons = [];

    const animeButtonToday = $('#anime-button-today');
    const animeButtonSeasonal = $('#anime-button-seasonal');
    const animeButtonUsers = $('#anime-button-users');
    const animeButtonScore = $('#anime-button-score');

    animeButtons.push(animeButtonToday);
    animeButtons.push(animeButtonSeasonal);
    animeButtons.push(animeButtonUsers);
    animeButtons.push(animeButtonScore);

    const achivementButtons = [];

    const achievementsButtonFractals = $('#achievements-button-fractals');
    const achievementsButtonPVE = $('#achievements-button-pve');
    const achievementsButtonWVW = $('#achievements-button-wvw');

    achivementButtons.push(achievementsButtonFractals);
    achivementButtons.push(achievementsButtonPVE);
    achivementButtons.push(achievementsButtonWVW);

    const daysOfWeek = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];

    class Anime {
        constructor(name, members, rating, airingDay, airingTime, airingTMZ) {
            this.name = name;
            this.members = members;
            this.rating = rating;
            this.airingDay = airingDay;
            this.airingTime = airingTime;
            this.airingTMZ = airingTMZ;
        }
    }

    class Achivement {
        constructor(name, type, reqs) {
            this.name = name;
            this.type = type;
            this.reqs = reqs;
        }
    }

    class WeatherCurrent {
        constructor(weatherMain, wind, humidity, clouds, temp, feelsLike, tempMin, tempMax) {
            this.weatherMain = weatherMain;
            this.wind = wind;
            this.humidity = humidity;
            this.clouds = clouds;
            this.temp = temp;
            this.feelsLike = feelsLike;
            this.tempMin = tempMin;
            this.tempMax = tempMax;
        }
    }

    class WeatherHourly {
        constructor(weatherMain, temp, wind) {
            this.weatherMain = weatherMain;
            this.temp = temp;
            this.wind = wind;
        }
    }

    const convertJpDayToLocalDay = (airingDay, airingTime) => {
        const hourAsInt = parseInt(airingTime.substring(0, 2));

        var day = airingDay;

        var indexOfDay = daysOfWeek.indexOf(day);

        indexOfDay = indexOfDay - 1;

        if (indexOfDay < 0) {
            indexOfDay = 6;
        }

        if (hourAsInt - 9 < 0) {
            day = daysOfWeek[indexOfDay];
        }

        return day;
    }

    const createCurrentWeatherContentItem = (weatherCurrent, countryCode, cityName) => {
        var currentWeatherItem = $(`<div class="current-weather-item"><h3>Current Weather:</h3></div>`);

        const currentWeatherItemList = $('<ul></ul>');

        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Country', countryCode));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Place', cityName));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Conditions', weatherCurrent.weatherMain));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Wind Speed', weatherCurrent.wind, 'knots'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Humidity', weatherCurrent.humidity, '%'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Clouds Coverage', weatherCurrent.clouds, '%'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Temperature', weatherCurrent.temp, 'C'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Feels Like', weatherCurrent.feelsLike, 'C'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Min. Temp', weatherCurrent.tempMin, 'C'));
        currentWeatherItemList.append(createListItem('current-weather-listItem', 'Max. Temp', weatherCurrent.tempMax, 'C'));

        currentWeatherItem.append(currentWeatherItemList);

        return currentWeatherItem;
    }

    const createHourlyWeatherItem = (weatherHourly, hour) => {
        const hourWeatherItem = $(`<div class="hourly-weather-item"><h4>Weather at: ${hour}:00</h4></div>`);

        const hourWeatherItemList = $('<ul></ul>');

        hourWeatherItemList.append(createListItem('hour-weather-list-item', 'Conditions', weatherHourly.weatherMain));
        hourWeatherItemList.append(createListItem('hour-weather-list-item', 'Temperature', weatherHourly.temp, 'C'));
        hourWeatherItemList.append(createListItem('hour-weather-list-item', 'Wind', weatherHourly.wind, 'knots'));

        hourWeatherItem.append(hourWeatherItemList);

        return hourWeatherItem;
    }

    const createAchivementContentItem = (achivement) => {
        const achivementContentItem = $(`<div class="achivement-item"><h4>${achivement.name}</h4></div>`);

        const achivementContentItemList = $('<ul></ul>');

        achivementContentItemList.append(createListItem('achivementListItem', 'Name', achivement.name));
        achivementContentItemList.append(createListItem('achivementListItem', 'Type', achivement.type));
        achivementContentItemList.append(createListItem('achivementListItem', 'Requirement', achivement.reqs));

        achivementContentItem.append(achivementContentItemList);

        return achivementContentItem;
    }

    const createAnimeContentItem = (anime) => {
        const animeContentItem = $(`<div class="anime-item"><h4>${anime.name}</h4></div>`);

        const animeContentItemList = $('<ul></ul>');

        animeContentItemList.append(createListItem('anime-list-item', 'Members', anime.members));
        animeContentItemList.append(createListItem('anime-list-item', 'Rating', anime.rating));
        animeContentItemList.append(createListItem('anime-list-item', "Day", anime.airingDay));


        animeContentItem.append(animeContentItemList);

        return animeContentItem;
    }

    const createListItem = (listClass, listTextHead, listTextBody, unit) => {
        var listItem;

        if (unit === undefined) {
            listItem = $(`<li><p>${listTextHead}: ${listTextBody}</p></li>`);
        } else {
            listItem = $(`<li><p>${listTextHead}: ${listTextBody} ${unit}</p></li>`);
        }

        listItem.toggleClass(listClass);

        return listItem
    }

    const geoLocate = () => {
        showSpinner(currentWeatherElementWrapper, 'weatherC');
        showSpinner(hourlyWeatherElementWrapper, 'weatherH');
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    const successCallback = (position) => {
        var lat = Number.parseFloat(position.coords.latitude);
        var lon = Number.parseFloat(position.coords.longitude);

        lat = lat.toFixed(2);
        lon = lon.toFixed(2);

        getWeather(lat, lon);
    }

    const errorCallback = () => {
        const lat = 50.05;
        const lon = 14.34;

        getWeather(lat, lon);
    }

    const getWeather = (lat, lon) => {
        axios.get(weatherCurrentUrl, {
            params: {
                lat: lat,
                lon: lon,
                appid: weatherApiKey,
                units: 'metric'
            }
        }).then((resp) => {
            const currentWeatherRes = resp.data;

            hideSpinner(currentWeatherElementWrapper);

            const weatherList = currentWeatherRes.weather;

            const weatherConditions = weatherList[0].main;

            var currentWeatherItem = createCurrentWeatherContentItem(new WeatherCurrent(
                weatherConditions,
                currentWeatherRes.wind.speed,
                currentWeatherRes.main.humidity,
                currentWeatherRes.clouds.all,
                currentWeatherRes.main.temp,
                currentWeatherRes.main["feels_like"],
                currentWeatherRes.main["temp_min"],
                currentWeatherRes.main["temp_max"],
            ), currentWeatherRes.sys.country, currentWeatherRes.name);

            currentWeatherElementWrapper.empty().append(currentWeatherItem);
        })

        axios.get(weatherHourUrl, {
            params: {
                lat: lat,
                lon: lon,
                appid: weatherApiKey,
                cnt: 3,
                units: 'metric'
            }
        }).then((resp) => {
            const hourWeatherRes = resp.data;

            hideSpinner(hourlyWeatherElementWrapper);

            const place = hourWeatherRes.city.name;

            const country = hourWeatherRes.city.country;

            const weatherList = hourWeatherRes.list;

            const weatherListOfDivs = [];

            weatherList.forEach(element => {

                const date = new Date(element.dt * 1000);

                var hours = date.getHours();

                const weatherList = element.weather;

                const weatherConditions = weatherList[0].main;

                const hourWeatherItem = createHourlyWeatherItem(new WeatherHourly(
                    weatherConditions,
                    element.main.temp,
                    element.wind.speed,
                ), hours);

                weatherListOfDivs.push(hourWeatherItem);
            })

            var hourWeatherItemDesc = $(`<div class="hour-weather-list-desc"><h3>Hourly forecast for:</h3></div>`);

            var hourWeatherItemDescList = $('<ul></ul>');

            hourWeatherItemDescList.append(createListItem('hour-weather-list-desc-item', 'Country', country));
            hourWeatherItemDescList.append(createListItem('hour-weather-list-desc-item', 'Place', place));

            hourWeatherItemDesc.append(hourWeatherItemDescList);

            hourlyWeatherElementWrapper.empty().append(hourWeatherItemDesc);

            hourlyWeatherElementWrapper.append(weatherListOfDivs);
        })
    }

    const getGwAchievements = (listType) => {
        showSpinner(achievementsContentElementWrapper, 'ach');

        axios.get(achievementsDailyUrl).then((resp) => {
            const achievementList = resp.data;

            var achivementListOfType;

            var achievementListForRes = [];

            var ids = "";

            switch (listType) {
                case 'wvw':
                    achivementListOfType = achievementList.wvw;
                    break;
                case 'pve':
                    achivementListOfType = achievementList.pve;
                    break;
                case 'fractals':
                    achivementListOfType = achievementList.fractals;
                    break;
            }

            var index = 0;

            achivementListOfType.forEach(element => {
                ids += element.id + ",";
                index++;
            })

            ids = ids.substring(0, ids.length - 1);

            axios.get(achievementsUrl, {
                params: {
                    ids: ids
                }
            }).then((resp) => {
                const achievementList = resp.data;

                hideSpinner(achievementsContentElementWrapper);

                index = 0;

                achievementList.forEach(element => {
                    achievementListForRes[index] = new Achivement(element.name, achivementListType, element.requirement)

                    index++;
                })

                var achievementListOfDivs = [];

                achievementListForRes.forEach(element => {
                    const achivementContentItem = createAchivementContentItem(element);

                    achievementListOfDivs.push(achivementContentItem);
                })

                achievementsContentElementWrapper.empty().append(achievementListOfDivs);
            })
        })
    }

    const getAnimeList = (sortBy, typeOfList) => {
        showSpinner(animeContentElementWrapper, 'anime');

        axios.get(animeCurrentSeasonUrl).then((resp) => {
            hideSpinner(animeContentElementWrapper);

            const animeList = resp.data.data;

            const animeListForRes = [];

            var animeListFinal = [];

            var index = 0;

            animeList.forEach(element => {

                var day = convertJpDayToLocalDay(element.broadcast.day, element.broadcast.time);

                animeListForRes[index] = new Anime(element.title, element.members, element.score, day, element.broadcast.time, element.broadcast.timezone);

                index++;
            });

            if (sortBy == 'users') {
                animeListForRes.sort((a, b) => (a.members < b.members) ? 1 : (a.members > b.members) ? -1 : 0);
            } else {
                animeListForRes.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating > b.rating) ? -1 : 0);
            }

            if (typeOfList == 'seasonal') {
                animeListFinal = animeListForRes.slice(0, 6);
            } else if (typeOfList == 'today') {
                animeListTemp = [];
                const currentDayValue = new Date().getUTCDay();
                animeListForRes.forEach(element => {
                    if (daysOfWeek.indexOf(element.airingDay) == currentDayValue) {
                        animeListTemp.push(element);
                    }
                    animeListFinal = animeListTemp.slice(0, 6);
                })
            }

            var listOfAnimeDivs = [];

            animeListFinal.forEach(element => {

                const animeContentItem = createAnimeContentItem(element);

                listOfAnimeDivs.push(animeContentItem);
            })

            animeContentElementWrapper.empty().append(listOfAnimeDivs);
        })
    }

    const initButtons = () => {

        animeButtons.forEach(element => {
            element.click((e => {
                if ($(element).attr('data-type') === 'today' || $(element).attr('data-type') == 'seasonal') {
                    animeListType = $(element).attr('data-type');
                } else if ($(element).attr('data-type') === 'users' || $(element).attr('data-type') == 'score') {
                    sortByAnime = $(element).attr('data-type');
                }
                e.preventDefault();
                getAnimeList(sortByAnime, animeListType);
            }))
        });

        achivementButtons.forEach(element => {
            element.click((e => {
                e.preventDefault();
                achivementListType = $(element).attr('data-type');
                getGwAchievements(achivementListType);
            }))
        })

        weatherButton.click((e => {
            e.preventDefault();

            geoLocate();
        }))
    }

    const showSpinner = (wrapperToShowIn, type) => {
        wrapperToShowIn.empty();

        switch (type) {
            case 'anime':
                wrapperToShowIn.append(spinnerAnime)
                break;
            case 'ach':
                wrapperToShowIn.append(spinnerAchivements)
                break;
            case 'weatherC':
                wrapperToShowIn.append(spinnerWeatherC)
                break;
            case 'weatherH':
                wrapperToShowIn.append(spinnerWeatherH)
                break;
        }
    }

    const hideSpinner = (wrapperToHideIn) => {
        wrapperToHideIn.empty();
    }

    geoLocate();

    const somestuff = animeButtonSeasonal[0].dataset.type;

    getAnimeList(sortByAnime, animeListType);

    getGwAchievements(achivementListType);

    initButtons();

})()