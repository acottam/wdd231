/* ========== Nav: hamburger toggle, active state ========== */
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

const url = 'data/members.json';
const cards = document.querySelector('#cards');

async function getMemberData() { 
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

getMemberData();

const displayMembers = (members) => {
  members.forEach((member) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let logo = document.createElement('img');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let website = document.createElement('a');

    // Build the h2 content out to show the member's full name
    fullName.textContent = `${member.name}`; 
    // Build the image logo by setting all the relevant attributes
    logo.setAttribute('src', `images/${member.image}`);
    logo.setAttribute('alt', `Logo of ${member.name}`); 
    logo.setAttribute('loading', 'lazy');
    //logo.setAttribute('width', '200');
    logo.setAttribute('height', '100');

    // Build the address, phone, and website content
    address.textContent = `Address: ${member.address}`;
    phone.textContent = `Phone: ${member.phone}`;
    website.textContent = member.website;
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener');

    // Append the section(card) with the created elements
    card.appendChild(fullName); 
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
} 

/* ========== Footer ========== */
// use the date object
let today = new Date();

// set the text content of the span element with the current year
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;

// set the text content of the span element with the last modified date
document.querySelector('#lastmodified').textContent = `Last Modification: ${document.lastModified}`;
