// --- Footer -- //
const today = new Date();
document.getElementById("currentyear").innerHTML = `©${today.getFullYear()}`;
document.querySelector("#lastmodified").textContent = `Last modified: ${document.lastModified}`;

// --- Weather --- //
// Coordinates for San Marino - 43.935, 12.447 //
(async () => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=43.935&longitude=12.447&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current || {};
    const code = Number(c.weather_code ?? -1);

    const descMap = {
      0: "Clear Sky", 1: "Mainly clear", 2: "Partly Cloudy", 3: "Overcast",
      45: "Fog", 48: "Depositing Rime Fog",
      51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
      61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
      71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
      80: "Rain Showers", 81: "Rain Showers", 82: "Heavy Showers",
      95: "Thunderstorm"
    };

    // Display weather info
    document.getElementById("weather-temp").textContent = Math.round(c.temperature_2m) + "°C";
    document.getElementById("weather-desc").textContent = descMap[code] || "—";
    document.getElementById("weather-wind").textContent = Math.round(c.wind_speed_10m ?? 0) + " km/h";
    document.getElementById("weather-hum").textContent = Math.round(c.relative_humidity_2m ?? 0) + "%";
    document.getElementById("weather-time").textContent = new Date(c.time || Date.now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

    // --- Wind Chill Calculation ---
    function calculateWindChill(t, s) { 
      return 35.74 + (0.6215 * t) - (35.75 * Math.pow(s, 0.16)) + (0.4275 * t * Math.pow(s, 0.16));
    }

    // Convert from °C to °F 
    const tempC = c.temperature_2m;
    const windKmh = c.wind_speed_10m ?? 0;
    const tempF = (tempC * 9/5) + 32;
    const windMph = windKmh / 1.609;

    let chill = "N/A";
    if (tempF <= 50 && windMph > 3) {
      chill = calculateWindChill(tempF, windMph).toFixed(1) + " °F";
    }

    document.getElementById("weather-chill").textContent = chill;

  } catch (err) {
    document.getElementById("weather-desc").textContent = "Weather unavailable";
    console.error(err);
  }
})();