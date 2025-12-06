// Load parks from JSON
let parks = [];

async function loadParks() {
  try {
    const response = await fetch('data/parks-list.json');
    parks = await response.json();
    displayParks(parks);
  } catch (error) {
    console.error('Error loading parks:', error);
  }
}

// Display parks
function displayParks(parksToShow) {
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
        <a href="park.html?id=${park.name.toLowerCase().replace(/\s+/g, '-')}" class="btn">View Details</a>
      </div>
    </article>
  `).join('');
}

// Filter and sort
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
  
  displayParks(filtered);
}

document.getElementById('region-filter').addEventListener('change', filterAndSort);
document.getElementById('sort-filter').addEventListener('change', filterAndSort);

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

// Load and display all parks
loadParks();
