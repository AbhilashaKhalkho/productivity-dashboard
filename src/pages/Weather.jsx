import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "c7eaaa8440a1deabe666ff3fcf7e1ee3"; // Replace with your real key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Weather App</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-5xl font-bold text-blue-600">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
