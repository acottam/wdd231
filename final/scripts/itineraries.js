// Load random hero background
async function loadHeroBackground() {
  try {
    const response = await fetch('data/parks-list.json');
    const parks = await response.json();
    const randomPark = parks[Math.floor(Math.random() * parks.length)];
    const hero = document.querySelector('.itinerary-page-hero');
    hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
    document.getElementById('hero-caption').textContent = randomPark.name;
    
    // Generate itineraries
    generateItineraries(parks);
  } catch (error) {
    console.error('Error loading hero background:', error);
  }
}

// Generate itineraries dynamically
function generateItineraries(parks) {
  const parksWithItineraries = parks.filter(p => p.itinerary);
  const container = document.getElementById('itineraries-container');
  
  container.innerHTML = parksWithItineraries.map(park => {
    const daysHTML = park.itinerary.days.map((day, index) => `
      <div class="day day${index + 1}">
        <h5>${day.day}</h5>
        <ul>
          ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    
    return `
      <section class="itinerary ${park.region}">
        <div class="itinerary-hero">
          <img src="${park.image}" alt="${park.name}">
          <h3 class="hero-title">${park.name}</h3>
        </div>
        <h3>${park.name}</h3>
        <h4>${park.itinerary.title}</h4>
        <div class="days-container">
          ${daysHTML}
        </div>
        <div class="itinerary-cta">
          <a href="tips.html?park=${encodeURIComponent(park.name)}" class="cta-btn">Get Planning Tips for ${park.name}</a>
        </div>
      </section>
    `;
  }).join('');
}

// Menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const nav = document.getElementById('primary-nav');
  const btn = document.getElementById('menu-toggle');
  nav.classList.toggle('open');
  nav.classList.toggle('closed');
  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = `Last Modified: ${document.lastModified}`;

// Set active navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Load hero background
loadHeroBackground();
