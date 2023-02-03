const API_KEY = '3f514e6d27c94ba6ba9d5cda85048ea8'
const API_URL_TEMP = 'https://api.weatherbit.io/v2.0/history/daily'
const API_URL_QUALITY = 'https://api.weatherbit.io/v2.0/history/airquality'

let graph = $("#graph")
let cityInput = $("#cityInput")
let typeSelect = $('#typeSelect')
const savedPlacesDIV = $('#savedPlaces')
let fetchButton = $('#fetchButton')
let clearButton = $('#clearButton')
let clearCities = $('#clearCities')
const geoButton = $('#geo')
const modal = $('#modal')


$(document).ready(function () {
    clearCities.click(function () {
        localStorage.removeItem('savedPlaces')
        refreshPlaces()
    })
    fetchButton.click(fetchByType)
    clearButton.click(clearValue)

    geoButton.click(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
    })
    modal.css('display', 'none')

})
let geocoder;

//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)//atributy budou se pouzivat ve funkci codeLatLng
}

function errorFunction() {
    alert("Geocoder failed");
}

let savedPlaces = JSON.parse(localStorage.getItem('savedPlaces') || "[]") || []


function refreshPlaces() {
    savedPlaces = JSON.parse(localStorage.getItem('savedPlaces') || "[]") || []
    savedPlacesDIV.html("")
    savedPlaces.forEach((place, index) => {
        savedPlacesDIV.append(`<div class="place-wrapper"><div class="place" id="fetch_${index}">${place}</div><span class="material-symbols-outlined" id="delete_${index}">close</span></div>`)
        $(`#fetch_${index}`).click(() => {
            cityInput.val(place)
            fetchButton.trigger('click')
        })
        $(`#delete_${index}`).click(() => {
            savedPlaces.splice(index, 1)
            localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces))
            refreshPlaces()
        })
    })

}


refreshPlaces();
$('#form').submit(function (e) {
    e.preventDefault()
    return false
})

//function for choosing count of days to show, param date is today`s date, param days we put 30
function subtractDays(date, days) {
    let copy = new Date(Number(date))
    copy.setDate(date.getDate() - days)
    return copy
}


//function for rendering graph with ApexCharts
function renderGraph(options) {

    graph.html("");
    const chart = new ApexCharts(document.querySelector("#graph"), options);
    chart.render();
}

//function for formating date, to type we need: YYYY-MM-DD
function formatDate(now) {
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${(now.getDate()).toString().padStart(2, '0')}`

}

//function for button clear, to clear the fill
function clearValue() {
    cityInput.val("")
}

//function when click on Fetch button; controls accuracy city name and on depency which typeSelect was choosen, calls a fetch function
async function fetchByType() {
    modal.css('display', 'block')
    let city = cityInput.val()
    if (city.length <= 1) {
        modal.css('display', 'none')
        alert("Please provide the city")
        return;
    }
    if (savedPlaces.indexOf(city) === -1) {
        savedPlaces.push(city)
    }
    localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces))
    refreshPlaces()
    let type = typeSelect.val()

    try {
        if (type === 'temperature') {
            await fetchTemperature();
        } else {
            await fetchQuality()
        }
    } catch (e) {
        alert(e.message)
    } finally {
        modal.css('display', 'none')
    }
}

//function for build quality of air graph
async function fetchQuality() {
    let city = cityInput.val()

    let result = await axios.get(API_URL_QUALITY, {
        params: {
            key: API_KEY,
            start_date: formatDate(subtractDays(new Date(), 30)),
            end_date: formatDate(new Date()),
            city: city,
        }
    })

    let data = {}
    if (result.status === 204) {
        alert("There is no such city")
        return;
    }
    result.data.data.map(el => {
        let date = el.timestamp_local.substring(0, 10)//
        if (data[date] === undefined) {
            data[date] = [el.aqi]
        } else {
            data[date].push(el.aqi)
        }
    })

    let keys = []
    let qualities = []

    Object.keys(data).sort((a, b) => a > b ? 1 : -1).map(date => {
        let key = date.substring(5)
        keys.push(key)
        let quality = 0;
        for (let num of data[date]) {
            quality += num;
        }
        quality = parseInt(quality / data[date].length)
        qualities.push(quality)
    })
    const options = {
        chart: {
            type: 'line'
        }, series: [{
            name: 'qual', data: qualities
        }], xaxis: {
            categories: keys
        }
    }
    renderGraph(options)

}

//function for build temperature graph
async function fetchTemperature() {
    let city = cityInput.val()

    let result = await axios.get(API_URL_TEMP, {
        params: {
            key: API_KEY,
            start_date: formatDate(subtractDays(new Date(), 30)),
            end_date: formatDate(new Date()),
            city: city,
        }
    })

    if (result.status === 204) {
        alert("There is no such city")
        return;
    }

    console.log(result)
    let data = result.data.data.sort((a, b) => a.datetime > b.datetime ? 1 : -1)
    const options = {
        chart: {
            type: 'line'
        }, series: [{
            name: 'temp', data: data.map(obj => obj.temp)
        }], xaxis: {
            categories: data.map(e => e.datetime.substring(5))
        }
    }
    renderGraph(options)
}

function init() {
    console.log('loaded')
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

    const latlng = new google.maps.LatLng(lat, lng);
    let city = ""
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                //formatted address
                //find country name
                for (let i = 0; i < results[0].address_components.length; i++) {
                    for (let b = 0; b < results[0].address_components[i].types.length; b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] === "administrative_area_level_1") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                console.log(city)
                cityInput.val(city.long_name)
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}