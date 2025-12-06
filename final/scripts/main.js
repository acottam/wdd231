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
    generateModals(selected);
    generateItineraryPreviews(parks);
  } catch (error) {
    console.error('Error loading parks:', error);
  }
}

// Generate itinerary previews
function generateItineraryPreviews(allParks) {
  const showcaseParks = allParks.filter(p => p.showcase && p.itinerary).slice(0, 3);
  const container = document.getElementById('itinerary-preview-grid');
  
  container.innerHTML = showcaseParks.map(park => {
    const highlights = park.itinerary.days.slice(0, 3).map(day => 
      day.activities[0] || day.day
    );
    
    return `
      <article class="itinerary-preview">
        <h3>${park.itinerary.title}</h3>
        <p>${park.description}</p>
        <ul>
          ${highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      </article>
    `;
  }).join('');
}

// Generate modals dynamically
function generateModals(parksToShow) {
  const container = document.getElementById('modal-container');
  container.innerHTML = parksToShow.map(park => {
    if (!park.itinerary) return '';
    
    const modalId = park.name.toLowerCase().replace(/\s+/g, '-') + '-modal';
    const daysHTML = park.itinerary.days.map(day => `
      <h4>${day.day}</h4>
      <ul>
        ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
      </ul>
    `).join('');
    
    return `
      <div id="${modalId}" class="modal">
        <div class="modal-content">
          <div class="modal-header modal-header-image">
            <img src="${park.image}" alt="${park.name}">
            <div class="modal-header-overlay">
              <span class="close">&times;</span>
              <h3>${park.itinerary.title}</h3>
            </div>
          </div>
          <div class="modal-body">
            ${daysHTML}
            <div class="modal-cta">
              <a href="tips.html?park=${encodeURIComponent(park.name)}" class="cta-btn">Get Planning Tips for ${park.name}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Re-attach modal event listeners
  attachModalListeners();
}

// Attach modal event listeners
function attachModalListeners() {
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
