// Load parks from JSON
let parks = [];

async function loadParks() {
  try {
    const response = await fetch('data/parks-list.json');
    parks = await response.json();
    
    // Set random hero background
    const randomPark = parks[Math.floor(Math.random() * parks.length)];
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
    document.getElementById('hero-caption').textContent = randomPark.name;
    
    // Get featured parks and randomize
    const featured = parks.filter(p => p.featured);
    const shuffled = featured.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    displayParks(selected);
  } catch (error) {
    console.error('Error loading parks:', error);
  }
}

// Display parks
function displayParks(parksToShow) {
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = parksToShow.map(park => `
    <article class="park-card">
      <img src="${park.image}" alt="${park.name}" loading="lazy">
      <div class="park-card-content">
        <span class="region">${park.region.toUpperCase()}</span>
        <h3>${park.name}</h3>
        <p class="state">${park.state}</p>
        <p>${park.description}</p>
        <p><strong>Best Season:</strong> ${park.season}</p>
        <p><strong>Top Activity:</strong> ${park.activity}</p>
        <a href="#" class="btn view-itinerary" data-modal="${park.name.toLowerCase().replace(/\s+/g, '-')}-modal">View Sample Itinerary</a>
      </div>
    </article>
  `).join('');
  
  // Add modal event listeners
  document.querySelectorAll('.view-itinerary').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });
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

// Load and display parks
loadParks();

// Modal functionality
const closeButtons = document.querySelectorAll('.close');
const modals = document.querySelectorAll('.modal');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
