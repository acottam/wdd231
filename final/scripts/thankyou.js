// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Display submission details
const detailsDiv = document.getElementById('submission-details');
const details = [];

if (params.get('name')) details.push(`<p><strong>Name:</strong> ${params.get('name')}</p>`);
if (params.get('email')) details.push(`<p><strong>Email:</strong> ${params.get('email')}</p>`);
if (params.get('park')) details.push(`<p><strong>Park of Interest:</strong> ${params.get('park')}</p>`);
if (params.get('travel-date')) details.push(`<p><strong>Travel Date:</strong> ${params.get('travel-date')}</p>`);
if (params.get('party-size')) details.push(`<p><strong>Party Size:</strong> ${params.get('party-size')} people</p>`);
if (params.get('interests')) details.push(`<p><strong>Special Interests:</strong> ${params.get('interests')}</p>`);

detailsDiv.innerHTML = details.join('');

// Display submission statistics
const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
const statsDiv = document.getElementById('submission-stats');

if (submissions.length > 0) {
  const latest = submissions[submissions.length - 1];
  const timestamp = new Date(latest.timestamp).toLocaleString();
  
  statsDiv.innerHTML = `
    <div class="stats-box">
      <h3>Your Submission Stats</h3>
      <p><strong>Total Submissions:</strong> ${submissions.length}</p>
      <p><strong>Latest Submission:</strong> ${timestamp}</p>
    </div>
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
