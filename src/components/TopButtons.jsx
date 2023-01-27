import React from "react";

function TopButtons({ setQuery, cities, setCities }) {
  // функция удаления города с хедера
  const removeCity = (id) => {
    const towns = cities.filter((el) => el.id !== id);
    setCities(towns);
  };

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <div key={city.id}>
          <button className="x-button" onClick={() => removeCity(city.id)}>
            ×
          </button>

          <button
            className="text-white text-lg font-medium capitalize"
            onClick={() => setQuery({ q: city.q })}
          >
            {city.q}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TopButtons;
