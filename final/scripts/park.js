// Get park ID from URL
const params = new URLSearchParams(window.location.search);
const parkId = params.get('id');

// Load and display park details
async function loadParkDetails() {
  try {
    const response = await fetch('data/parks.json');
    const data = await response.json();
    const park = data.parks.find(p => p.id === parkId);
    
    if (park) {
      displayParkDetails(park);
    } else {
      document.getElementById('park-detail').innerHTML = '<p>Park not found.</p>';
    }
  } catch (error) {
    console.error('Error loading park data:', error);
  }
}

function displayParkDetails(park) {
  const container = document.getElementById('park-detail');
  container.innerHTML = `
    <section class="park-header">
      <h2>${park.name} National Park</h2>
      <p class="region">${park.state}</p>
    </section>
    
    <section class="park-info">
      <h3>About</h3>
      <p>${park.description}</p>
      <p><strong>Best Season:</strong> ${park.season}</p>
      <p><strong>Top Activity:</strong> ${park.activity}</p>
    </section>
    
    <section class="trails">
      <h3>Kid-Friendly Trails</h3>
      ${park.trails.map(trail => `
        <div class="trail-card">
          <h4>${trail.name}</h4>
          <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
          <p><strong>Distance:</strong> ${trail.distance}</p>
          <p><strong>Elevation Gain:</strong> ${trail.elevation}</p>
        </div>
      `).join('')}
    </section>
    
    <section class="tips">
      <h3>Planning Tips</h3>
      <ul>
        ${park.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>
    </section>
  `;
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

loadParkDetails();
