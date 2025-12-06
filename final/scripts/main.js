// Load parks from JSON
let parks = [];

async function loadParks() {
  try {
    const response = await fetch('data/parks-list.json');
    parks = await response.json();
    
    // Check which page we're on
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'parks.html') {
      // Parks page logic
      const randomPark = parks[Math.floor(Math.random() * parks.length)];
      const hero = document.querySelector('.parks-page-hero');
      hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
      document.getElementById('hero-caption').textContent = randomPark.name;
      
      parks.sort((a, b) => a.name.localeCompare(b.name));
      displayParksPage(parks);
    } else {
      // Home page logic
      const randomPark = parks[Math.floor(Math.random() * parks.length)];
      const hero = document.querySelector('.hero');
      hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
      document.getElementById('hero-caption').textContent = randomPark.name;
      
      const featured = parks.filter(p => p.featured);
      const shuffled = featured.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
      
      displayParks(selected);
      generateModals(selected);
      generateItineraryPreviews(parks);
    }
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

// Display parks (home page)
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

// Display parks (parks page)
function displayParksPage(parksToShow) {
  const grid = document.getElementById('park-grid');
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
        <a href="#" class="btn view-park-details" data-park="${park.name}">View Details</a>
      </div>
    </article>
  `).join('');
  
  // Add modal event listeners
  document.querySelectorAll('.view-park-details').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parkName = link.getAttribute('data-park');
      const park = parks.find(p => p.name === parkName);
      if (park) {
        openParkModal(park);
      }
    });
  });
}

// Open park details modal (parks page)
function openParkModal(park) {
  const modalId = 'park-details-modal';
  let modal = document.getElementById(modalId);
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  
  const itineraryHTML = park.itinerary ? `
    <h4>Sample Itinerary: ${park.itinerary.title}</h4>
    ${park.itinerary.days.map(day => `
      <h5>${day.day}</h5>
      <ul>
        ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
      </ul>
    `).join('')}
  ` : '<p>No itinerary available for this park.</p>';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header modal-header-image">
        <img src="${park.image}" alt="${park.name}">
        <div class="modal-header-overlay">
          <span class="close">&times;</span>
          <h3>${park.name} National Park</h3>
        </div>
      </div>
      <div class="modal-body">
        <p><strong>Location:</strong> ${park.state}</p>
        <p><strong>Region:</strong> ${park.region.toUpperCase()}</p>
        <p><strong>Best Season:</strong> ${park.season}</p>
        <p><strong>Top Activity:</strong> ${park.activity}</p>
        <p>${park.description}</p>
        ${itineraryHTML}
        <div class="modal-cta">
          <a href="tips.html?park=${encodeURIComponent(park.name)}" class="cta-btn">Get Planning Tips for ${park.name}</a>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
  
  // Close button
  modal.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Filter and sort (parks page)
function filterAndSort() {
  const region = document.getElementById('region-filter').value;
  const sort = document.getElementById('sort-filter').value;
  
  let filtered = region === 'all' ? [...parks] : parks.filter(p => p.region === region);
  
  if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'region') {
    filtered.sort((a, b) => a.region.localeCompare(b.region));
  } else if (sort === 'season') {
    filtered.sort((a, b) => a.season.localeCompare(b.season));
  }
  
  displayParksPage(filtered);
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

// Filter listeners (parks page only)
const regionFilter = document.getElementById('region-filter');
const sortFilter = document.getElementById('sort-filter');
if (regionFilter && sortFilter) {
  regionFilter.addEventListener('change', filterAndSort);
  sortFilter.addEventListener('change', filterAndSort);
}

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
