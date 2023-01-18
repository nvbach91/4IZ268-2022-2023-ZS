import { DateTime } from "luxon";

const API_KEY = "6b92e5931d70676231401c767f3133ba";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric
//https://api.openweathermap.org/data/2.5/weather?q=yerevan&appid=6b92e5931d70676231401c767f3133ba

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  
  const {
    coord: { 
      lon,
      lat, 
    },
    main: { 
      temp, 
      feels_like, 
      temp_min, 
      temp_max, 
      humidity 
    },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
 
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };

      /* RETURNS Example daily
      {title: 'Wed', temp: 42.89, icon: '01d'}
      {title: 'Thu', temp: 41.88, icon: '04d'}
      {title: 'Fri', temp: 41.47, icon: '01d'}
      {title: 'Sat', temp: 42.87, icon: '01d'}
      {title: 'Sun', temp: 41.92, icon: '01d'}
      */

});

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
      /* RETURNS Example hourly
      {title: '06:00 AM', temp: 21.87, icon: '01n'}
      {title: '07:00 AM', temp: 24.06, icon: '01n'}
      {title: '08:00 AM', temp: 26.19, icon: '01n'}
      {title: '09:00 AM', temp: 29.23, icon: '01d'}
      {title: '10:00 AM', temp: 36.28, icon: '01d'}
      */
  });
  //TIMEZONE returns example - Asia/Yerevan
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData(
    "onecall", 
    {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }
  ).then(formatForecastWeather);
  return {...formattedForecastWeather , ...formattedCurrentWeather }; 
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrl };
