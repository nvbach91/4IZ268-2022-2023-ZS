import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
//mport getWeatherData from './services/weatherService';
import "react-toastify/dist/ReactToastify.css";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "yerevan" });
  const [cities, setCities] = useState([]); // Новый массив городов для хедера
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  // два следующих useEffect Сохраняют города в localStorage

  useEffect(() => {
    if (localStorage.getItem("cities")) {
      setCities(JSON.parse(localStorage.getItem("cities")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    const fetchWeather = async () => {
      //page loading animation
      const loadingCircle = document.getElementById("load-circle");
      loadingCircle.classList.remove("circle-invisible");
      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
        loadingCircle.classList.add("circle-invisible");
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} cities={cities} setCities={setCities} />
      <Inputs
        setQuery={setQuery}
        units={units}
        setUnits={setUnits}
        setCities={setCities}
        cities={cities}
      />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      {/* <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} /> */}
    </div>
  );
}

export default App;
