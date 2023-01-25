const form = $("#search_form")
const input = $("#search_term")

const msg = document.querySelector(".form_msg")
const list = document.querySelector(".cities")


const APIkey = 'c7259667067245b1c204f4af8fe5c5aa'


form.submit(e => {
    e.preventDefault()

    msg.textContent = ''
    msg.classList.remove('visible')

    let inputVal = input.val()

    const listItemsArray = Array.from(list.querySelectorAll('.cities li'))

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = ''
            let cityName = el.querySelector('.city_name').textContent.toLowerCase()
            let cityCountry = el.querySelector('.city_country').textContent.toLowerCase()

            if (inputVal.includes(',')) {
                if (inputVal.split(',')[1].length > 2) {
                    inputVal = inputVal.split(',')[0]

                    content = cityName
                } else {
                    content = `${cityName},${cityCountry}`
                }
            } else {
                content = cityName
            }
            return content == inputVal.toLowerCase()
        })

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city_name").textContent}`;
            msg.classList.add('visible')

            form.trigger("reset")
            input.focus()

            return
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${APIkey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod == '404') {
                throw new Error(`${data.cod}, ${data.message}`)
            }

            const { main, name, sys, weather } = data

            const icon = `img/weather/${weather[0]['icon']}.png`

            const li = document.createElement('li')

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
            `
            li.innerHTML = markup
            li.onclick = e => {
                if (e.target.className === "close-button") li.remove()
            }
            list.appendChild(li)
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city.'
            msg.classList.add('visible')
        })
    msg.textContent = ''
    form.trigger("reset")
    input.focus()
})