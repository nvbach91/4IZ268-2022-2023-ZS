const API_KEY = '2375c9005ed140a7b84edaa8fe79844a'
const API_URL_TEMP = 'https://api.weatherbit.io/v2.0/history/daily'
const API_URL_QUALITY = 'https://api.weatherbit.io/v2.0/history/airquality'


//function for choosing count of days to show, param date is today`s date, param days we put 30
function subtractDays(date, days) {
	let copy = new Date(Number(date))
	copy.setDate(date.getDate() - days)
	return copy
}


//function for rendering graph with ApexCharts
function renderGraph(options) {

	$("#graph").html("");
	const chart = new ApexCharts(document.querySelector("#graph"), options);
	chart.render();
}

//function for formating date, to type we need: YYYY-MM-DD
function formatDate(now) {
	return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${(now.getDate()).toString().padStart(2, '0')}`

}

//function for button clear, to clear the fill
function clearValue() {
	$("#cityInput").val("")
}

//function when click on Fetch button; controls accuracy city name and on depency which typeSelect was choosen, calls a fetch function
function fetchByType() {
	let city = $('#cityInput').val()
	if (city.length <= 1) {
		alert("Please provide the city")
		return;
	}
	let type = $('#typeSelect').val()
	if (type === 'temperature') {
		return fetchTemperature();
	} else {
		return fetchQuality()
	}
}

//function for build quality of air graph
async function fetchQuality() {
	let city = $('#cityInput').val()

	let result = await axios.get(API_URL_QUALITY, {
		params: {
			key: API_KEY, start_date: formatDate(subtractDays(new Date(), 30)), end_date: formatDate(new Date()), city: city,
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
			name: 'temp', data: qualities
		}], xaxis: {
			categories: keys
		}
	}
	renderGraph(options)

}

//function for build temperature graph
async function fetchTemperature() {
	let city = $('#cityInput').val()

	let result = await axios.get(API_URL_TEMP, {
		params: {
			key: API_KEY, start_date: formatDate(subtractDays(new Date(), 30)), end_date: formatDate(new Date()), city: city,
		}
	})

	if (result.status === 204) {
		alert("There is no such city")
		return;
	}

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
