/* ========== Discover Page Functionality ========== */

// Visitor tracking with localStorage
function trackVisitor() {
    // Date and Visitor information 
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitorInfo = document.getElementById('visitor-info');
    
    // No Last Visit
    if (!lastVisit) {
        visitorInfo.textContent = "Welcome! Let us know if you have any questions.";
    }
    // Previously Visited
    else {
        // Days Between
        const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        // Less that 1 Day
        if (daysBetween < 1) {
            visitorInfo.textContent = "Back so soon! Awesome!";
        }
        // Over 1 day ago
        else {
            const dayText = daysBetween === 1 ? "day" : "days";
            visitorInfo.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }
    
    // Save Last Visit
    localStorage.setItem('lastVisit', now.toString());
}

// Create gallery cards
async function createGalleryCards() {
    
    // Fetch JSON - All data for the discover page
    const response = await fetch('./data/discover.json');
    const discoverData = await response.json();
    
    // Grid
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Iterate through Objects
    discoverData.forEach((item, index) => {
        
        // Create a div element
        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        // Add Content to card
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
        
        // Append to GalleryGrid
        galleryGrid.appendChild(card);
    });
}

// Initialize Page: TrackVisitor
trackVisitor();

// Initialize Page: createGalleryCards
createGalleryCards();
