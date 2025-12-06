// Load random hero background
async function loadHeroBackground() {
  try {
    const response = await fetch('data/parks-list.json');
    const parks = await response.json();
    const randomPark = parks[Math.floor(Math.random() * parks.length)];
    const hero = document.querySelector('.itinerary-page-hero');
    hero.style.backgroundImage = `linear-gradient(rgba(11, 61, 46, 0.6), rgba(11, 61, 46, 0.6)), url('${randomPark.image}')`;
    document.getElementById('hero-caption').textContent = randomPark.name;
  } catch (error) {
    console.error('Error loading hero background:', error);
  }
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
