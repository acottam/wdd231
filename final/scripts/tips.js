// Load parks and populate dropdown
async function loadParks() {
  try {
    const response = await fetch('data/parks-list.json');
    const parks = await response.json();
    
    // Set random hero background
    const randomPark = parks[Math.floor(Math.random() * parks.length)];
    const hero = document.querySelector('.tips-page-hero');
    hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
    document.getElementById('hero-caption').textContent = randomPark.name;
    
    // Populate park dropdown
    const parkSelect = document.getElementById('park');
    parks.sort((a, b) => a.name.localeCompare(b.name));
    parks.forEach(park => {
      const option = document.createElement('option');
      option.value = park.name;
      option.textContent = park.name;
      parkSelect.appendChild(option);
    });
    
    // Pre-select park from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPark = urlParams.get('park');
    if (selectedPark) {
      parkSelect.value = selectedPark;
    }
  } catch (error) {
    console.error('Error loading parks:', error);
  }
}

// Form submission handler
document.getElementById('planning-form').addEventListener('submit', (e) => {
  // Track submission in localStorage
  let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
  submissions.push({
    timestamp: new Date().toISOString(),
    count: submissions.length + 1
  });
  localStorage.setItem('formSubmissions', JSON.stringify(submissions));
});

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

// Load parks and hero background
loadParks();
