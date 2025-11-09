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
    let address1 = document.createElement('p');
    let address2 = document.createElement('p');
    let phone = document.createElement('p');
    let website = document.createElement('a');

    // Build the full name content 
    fullName.textContent = `${member.name}`; 
    
    // Build the logo image content 
    logo.setAttribute('src', `images/${member.image}`);
    logo.setAttribute('alt', `Logo of ${member.name}`); 
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('height', '100');

    // Build the address, phone, and website content
    address1.textContent = `${member.address1}`;
    address2.textContent = `${member.address2}`;
    phone.textContent = `${member.phone}`;
    //website.textContent = member.website;
    website.textContent = 'Visit Website';
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener');

    // Append the elements to the card section
    card.appendChild(fullName); 
    card.appendChild(logo);
    card.appendChild(address1);
    card.appendChild(address2);
    card.appendChild(phone);
    card.appendChild(website);

    // Append the card to the cards container
    cards.appendChild(card);
  }); 
} 

/* ========== Footer ========== */
// use the date object
let today = new Date();

// set the text content of the span element with the current year
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;

// set the text content of the span element with the last modified date
document.querySelector('#lastmodified').textContent = `Last Modification: ${document.lastModified}`;