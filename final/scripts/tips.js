// Park data for dropdown
const parks = [
  "Yellowstone", "Grand Canyon", "Yosemite", "Zion", "Acadia", "Rocky Mountain",
  "Glacier", "Olympic", "Sequoia", "Joshua Tree", "Bryce Canyon", "Arches",
  "Great Smoky Mountains", "Shenandoah", "Everglades", "Denali", "Mount Rainier",
  "Crater Lake", "Grand Teton", "Badlands", "Canyonlands", "Capitol Reef",
  "Big Bend", "Mammoth Cave", "Hot Springs", "Congaree", "Biscayne", "Voyageurs",
  "Isle Royale", "Petrified Forest", "Death Valley", "Redwood", "Haleakalā",
  "Cuyahoga Valley", "Guadalupe Mountains"
];

// Populate park dropdown
const parkSelect = document.getElementById('park');
parks.forEach(park => {
  const option = document.createElement('option');
  option.value = park;
  option.textContent = park;
  parkSelect.appendChild(option);
});

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
