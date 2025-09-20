// --- Footer -- //
const today = new Date();
document.getElementById("currentyear").innerHTML = `©${today.getFullYear()}`;
document.querySelector("#lastmodified").textContent = `Last modified: ${document.lastModified}`;

// -- Weather -- //
// -- Coordinates for San Marino - 43.935, 12.447 -- //
(async () => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=43.935&longitude=12.447&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
    const res = await fetch(url);
    const data = await res.json();

    const c = data.current || {};
    const code = Number(c.weather_code ?? -1);

    const descMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Drizzle",
      55: "Heavy drizzle",
      61: "Light rain",
      63: "Rain",
      65: "Heavy rain",
      71: "Light snow",
      73: "Snow",
      75: "Heavy snow",
      80: "Rain showers",
      81: "Rain showers",
      82: "Heavy showers",
      95: "Thunderstorm"
    };
    const iconMap = (w) => {
      if ([0,1].includes(w)) return "☀️";
      if ([2].includes(w)) return "⛅";
      if ([3,45,48].includes(w)) return "☁️";
      if ([51,53,55,61,63,65,80,81,82].includes(w)) return "🌧️";
      if ([71,73,75].includes(w)) return "🌨️";
      if ([95].includes(w)) return "⛈️";
      return "⛅";
    };

    document.getElementById("weather-temp").textContent = Math.round(c.temperature_2m);
    document.getElementById("weather-desc").textContent = descMap[code] || "—";
    document.getElementById("weather-wind").textContent = Math.round(c.wind_speed_10m ?? 0);
    document.getElementById("weather-hum").textContent = Math.round(c.relative_humidity_2m ?? 0);
    document.getElementById("weather-time").textContent = new Date(c.time || Date.now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    document.getElementById("weather-icon").textContent = iconMap(code);
  } catch (err) {
    document.getElementById("weather-desc").textContent = "Weather unavailable";
    console.error(err);
  }
})();