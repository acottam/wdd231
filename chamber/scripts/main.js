/* ========== Nav: hamburger toggle, active state ========== */
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

// Toggle the navigation menu on click
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ========== Directory Members from JSON ========== */
const url = 'data/members.json';
const cards = document.querySelector('#cards');

// Fetch the member data from the JSON file
async function getMemberData() { 
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

// Call the function to get member data only if cards element exists
if (cards) {
    getMemberData();
}

// Function to display members
const displayMembers = (members) => {
  
  // Loop through each member in the members array
  members.forEach((member) => {
    
    // Create elements to add to the document
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let logo = document.createElement('img');
    let address = document.createElement('div');
    let phone = document.createElement('p');
    let website = document.createElement('a');

    // Build the full name content 
    fullName.textContent = `${member.name}`; 
    
    // Build the logo image content 
    logo.setAttribute('src', `images/${member.image}`);
    logo.setAttribute('alt', `${member.name} company logo`); 
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('height', '100');

    // Build the address content (combined for list view)
    address.className = 'address';
    address.innerHTML = `${member.address1}<br>${member.address2}`;
    
    // Build phone and website content
    phone.textContent = `${member.phone}`;
    website.textContent = 'Visit Website';
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener');

    // Append the elements to the card section
    card.appendChild(fullName); 
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    // Append the card to the cards container
    cards.appendChild(card);
  }); 
} 

/* ========== View Toggle ========== */
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

// Function to create table header for list view
function createTableHeader() {
  // Create header div
  const header = document.createElement("div");

  // Add class for table header styling
  header.className = "table-header";
  
  // Set inner HTML for header columns
  header.innerHTML = "<div>Name</div><div>Address</div><div>Phone</div><div>Website</div>";
  
  // Return header
  return header;
}

// Grid/List view toggle
if (gridBtn && listBtn && cards) {
  gridBtn.addEventListener('click', () => {
    // Remove list class
    cards.classList.remove('list');
    
    // Table header
    const header = cards.querySelector('.table-header');
    
    // Remove table header if exists 
    if (header) header.remove();
    
    // Set to active
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  // List view button
  listBtn.addEventListener('click', () => {
    
    // Add list class
    cards.classList.add('list');
    
    // Add table header if not already present
    if (!cards.querySelector('.table-header')) {
      cards.insertBefore(createTableHeader(), cards.firstChild);
    }

    // Set to active
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });

  // Set grid to be default view
  gridBtn.classList.add('active');
}

/* ========== Weather API ========== */
// OpenWeatherMap API key
const apiKey = '551d6638de426ca40500ea7a8cb010a4'; 

// Latitude: Wilsonville, Oregon
const lat = 45.2978;

// Longitude: Wilsonville, Oregon
const lon = -122.7731; 

// Function to get weather data
async function getWeatherData() {
    try {
        // Current weather
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        const currentData = await currentResponse.json();
        
        // 5-day forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        const forecastData = await forecastResponse.json();
        
        // Days to Forcast - 3 for assignment
        const days_to_forcast = 3;
        
        // Display Current Weather
        displayCurrentWeather(currentData);
        
        // Display Forcast
        displayForecast(forecastData, days_to_forcast);
    
    // Error Handling
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-desc').textContent = 'Weather data unavailable';
    }
}

// Function to display Current Weather
function displayCurrentWeather(data) {
    
    // Set Element Values
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('high-temp').textContent = Math.round(data.main.temp_max);
    document.getElementById('low-temp').textContent = Math.round(data.main.temp_min);
    document.getElementById('humidity').textContent = data.main.humidity;
    
    // Sunrise
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    
    // Sunset
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    
    // Update text
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
}

// Function to display forcast
function displayForecast(data, forcast_days) {
    
    // Forcast Grid
    const forecastGrid = document.getElementById('forecast-grid');
    
    // Daily Forcasts
    const dailyForecasts = {};
    
    // Group forecasts by day and get one per day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        if (!dailyForecasts[dateKey] && Object.keys(dailyForecasts).length < forcast_days) {
            dailyForecasts[dateKey] = item;
        }
    });
    
    // Daily forcasts
    Object.values(dailyForecasts).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="temp">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</div>
            <div class="desc">${forecast.weather[0].description}</div>
        `;
        forecastGrid.appendChild(forecastItem);
    });
}

/* ========== Footer ========== */
// use the date object
let today = new Date();

// set the text content of the span element with the current year
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;

// set the text content of the span element with the last modified date
document.querySelector('#lastmodified').textContent = `Last Modification: ${document.lastModified}`;

/* ========== Home Page Member Spotlights ========== */
async function getSpotlights() {

  // Spotlight Element
  const spotlightsContainer = document.getElementById('spotlights');
  
  // Only available on Home Page
  if (!spotlightsContainer) return;
  
  try {
      
    // Members JSON
    const response = await fetch('data/members.json');
    const data = await response.json();
    
    // Filter members with Gold (3) or Silver (2) membership
    const qualifiedMembers = data.members.filter(member => 
      member.membershipLevel === 2 || member.membershipLevel === 3
    );
    
    // Randomly select 3 members
    const selectedMembers = [];
    const numSpotlights = Math.min(3, qualifiedMembers.length);
    
    // Iterate through filtered members
    while (selectedMembers.length < numSpotlights) {
      // Get Random Index
      const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
      
      // Get Member at radom Index
      const member = qualifiedMembers[randomIndex];
      
      // Unique Members - Add to selected member if not already selected
      if (!selectedMembers.includes(member)) {
        selectedMembers.push(member);
      }
    }
    
    // Display the selected members
    selectedMembers.forEach(member => {
      // spotlight Card Element
      const spotlightCard = document.createElement('div');
      
      // Class Name
      spotlightCard.className = 'spotlight-card';
      
      // Membership Level (Gold or Silver)
      const membershipText = member.membershipLevel === 3 ? 'Gold' : 'Silver';
      
      // Set Spotlight Card
      spotlightCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} company logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address1}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <div class="membership-level">${membershipText} Member</div>
      `;
      
      // Append Spotlight Card to Containe
      spotlightsContainer.appendChild(spotlightCard);
    });
      
  // Error Handling
  } catch (error) {
    
    // Console Error
    console.error('Error fetching member data for spotlights:', error);
  }
}

/* ========== Initialize Home Page ========== */
if (document.querySelector('.hero')) {
    // Home Page (only)
    getWeatherData();
    getSpotlights();
}

/* ========== Join Form Timestamp ========== */
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    // Set Timestamp
    timestampField.value = new Date().toISOString();
}
