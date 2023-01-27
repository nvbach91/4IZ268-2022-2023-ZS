(function weatherForecast() {
    const form = $("#search_form");
    const input = $("#search_term");

    const msg = document.querySelector(".form_msg");
    const loader = document.querySelector(".loader");
    const list = document.querySelector(".cities");

    const APIkey = 'c7259667067245b1c204f4af8fe5c5aa';

    //========
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            addCityToTheBoard(null, true, position.coords)
        });
    }
    //========

    const initialWeather = localStorage.getItem('weather');
    if (initialWeather) {
        initialWeather.split(',').forEach(city => {
            addCityToTheBoard(city, true);
        })
    }
   
    function checkIfCityIsAdded(cityName) {
        const weatherData = localStorage.getItem('weather');
        return weatherData && weatherData.split(',').some(city => city.toLowerCase() === cityName.toLowerCase());
    }

    function addCityToTheBoard(cityName, initialCall, coords) {

        let url;

        if (coords) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${APIkey}&units=metric`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`;
        }

        loader.classList.add('visible');

        fetch(url)
            .then(response => response.json())
            .then(data => {

                loader.classList.remove('visible');

                if (data.cod == '404') {
                    throw new Error(`${data.cod}, ${data.message}`);
                }

                const { main, name, sys, weather } = data;

                if (!initialCall) {
                    const updatedWeatherData = (localStorage.getItem('weather') ? localStorage.getItem('weather') + ',' : '') + name;
                    localStorage.setItem('weather', updatedWeatherData);
                }

                const icon = `img/weather/${weather[0]['icon']}.png`;
                const li = document.createElement('li');

                const markup = `
                <button><img src="./img/close.svg" alt="" class="close-button"></button>
                <div>
                    <p><span class="city_name">${name}</span><span class="city_country">${sys.country}</span></p>
                    <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
                </div>
                <figure>
                    <img src="${icon}" alt="${weather[0]['description']}">
                </figure>
                <p class="city_conditions">${weather[0]['description'].toUpperCase()}</p>
            `;
                li.innerHTML = markup;

                li.addEventListener('click', e => {
                    if (e.target.className === "close-button") {
                        const weatherData = localStorage.getItem('weather');
                        localStorage.setItem('weather', weatherData.split(',').filter(city => city !== name));
                        li.remove();
                    }
                })
                list.prepend(li);


            })

            .catch(() => {
                msg.textContent = 'Please search for a valid city.';
                msg.classList.add('visible');
            })
    }

    form.submit(e => {
        e.preventDefault();

        msg.textContent = '';
        msg.classList.remove('visible');

        let inputValue = input.val();

        const arrayOfCities = inputValue.split(',');
        arrayOfCities.forEach(cityName => {
            const city = cityName.trim();
            if (checkIfCityIsAdded(city)) {
                msg.textContent = `You already know the weather for ${city}`;
                msg.classList.add('visible');

                setTimeout(() => {
                    msg.classList.remove('visible');
                }, 2000);

                form.trigger("reset");
                input.focus();
                return;
            }

            addCityToTheBoard(city);
        });


        form.trigger("reset");
        input.focus();
    })

})()