/* ========== Nav: hamburger toggle, active state ========== */
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

// Toggle the navigation menu on click
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ========== Directory Members from JSON ========== */
const url = 'data/members.json';
const cards = document.querySelector('#cards');

// Fetch the member data from the JSON file
async function getMemberData() { 
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

// Call the function to get member data
getMemberData();

// Function to display members
const displayMembers = (members) => {
  
  // Loop through each member in the members array
  members.forEach((member) => {
    
    // Create elements to add to the document
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let logo = document.createElement('img');
    let address = document.createElement('div');
    let phone = document.createElement('p');
    let website = document.createElement('a');

    // Build the full name content 
    fullName.textContent = `${member.name}`; 
    
    // Build the logo image content 
    logo.setAttribute('src', `images/${member.image}`);
    logo.setAttribute('alt', `Logo of ${member.name}`); 
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('height', '100');

    // Build the address content (combined for list view)
    address.className = 'address';
    address.innerHTML = `${member.address1}<br>${member.address2}`;
    
    // Build phone and website content
    phone.textContent = `${member.phone}`;
    website.textContent = 'Visit Website';
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener');

    // Append the elements to the card section
    card.appendChild(fullName); 
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    // Append the card to the cards container
    cards.appendChild(card);
  }); 
} 

/* ========== View Toggle ========== */
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

// Function to create table header for list view
function createTableHeader() {
  // Create header div
  const header = document.createElement("div");

  // Add class for table header styling
  header.className = "table-header";
  
  // Set inner HTML for header columns
  header.innerHTML = "<div>Name</div><div>Address</div><div>Phone</div><div>Website</div>";
  
  // Return header
  return header;
}

// Grid/List view toggle
if (gridBtn && listBtn && cards) {
  gridBtn.addEventListener('click', () => {
    // Remove list class
    cards.classList.remove('list');
    
    // Table header
    const header = cards.querySelector('.table-header');
    
    // Remove table header if exists 
    if (header) header.remove();
    
    // Set to active
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  // List view button
  listBtn.addEventListener('click', () => {
    
    // Add list class
    cards.classList.add('list');
    
    // Add table header if not already present
    if (!cards.querySelector('.table-header')) {
      cards.insertBefore(createTableHeader(), cards.firstChild);
    }

    // Set to active
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });

  // Set grid to be default view
  gridBtn.classList.add('active');
}

/* ========== Footer ========== */
// use the date object
let today = new Date();

// set the text content of the span element with the current year
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;

// set the text content of the span element with the last modified date
document.querySelector('#lastmodified').textContent = `Last Modification: ${document.lastModified}`;