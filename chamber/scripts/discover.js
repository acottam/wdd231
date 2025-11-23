// Discover page functionality
import discoverData from '../data/discover.mjs';

// Visitor tracking with localStorage
function trackVisitor() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitorInfo = document.getElementById('visitor-info');
    
    if (!lastVisit) {
        visitorInfo.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            visitorInfo.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysBetween === 1 ? "day" : "days";
            visitorInfo.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.toString());
}

// Create gallery cards
function createGalleryCards() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    discoverData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.gridArea = `card${index + 1}`;
        
        card.innerHTML = `
            <figure>
                <img src="${item.image}" 
                     alt="${item.alt}" 
                     loading="lazy"
                     width="300" 
                     height="200">
            </figure>
            <div class="card-content">
                <h3>${item.name}</h3>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <a href="${item.href}" target="_blank" rel="noopener" class="learn-more-btn">Learn More</a>
            </div>
        `;
        
        galleryGrid.appendChild(card);
    });
}

// Initialize page
trackVisitor();
createGalleryCards();
