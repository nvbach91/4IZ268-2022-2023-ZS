import React, { useState } from "react";
import {
  UilSave,
  UilSearch,
  UilLocationPoint,
  UilPlus,
} from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import getFormattedWeatherData from "../services/weatherService";

function Inputs({ setQuery, units, setUnits, setCities, cities }) {
  const [city, setCity] = useState("");

  // Запрос на сервер для получения id. id в последующем нужен для того чтобы могли удалить город с хедера
  const fetchWeather = async () => {
    await getFormattedWeatherData({ q: city, units }).then((data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      setCities([...cities, { q: city, id: data.id }]);
    });
  };

  // функция добавления города
  const handleAddClick = () => {
    if (cities.length <= 2) {
      if (city !== "") {
        if (!cities.some((el) => el.q === city)) {
          fetchWeather();
        }
      }
    }
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info(`Fetching users location`);
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-5/6 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          placeholder="Search for city..."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <UilSearch
          size={35}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilSave //can be set UliSave
          size={35}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleAddClick}
        />
        <div className="wrap">
          <div id="load-circle" className="circle circle-invisible"></div>
        </div>
        <UilLocationPoint
          size={35}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />

        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
