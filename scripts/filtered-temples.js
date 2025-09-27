// ---------------- Footer ----------------
const today = new Date();
document.getElementById(
  "currentyear"
).innerHTML = `&copy;${today.getFullYear()}`;
document.querySelector(
  "#lastmodified"
).textContent = `Last Modification: ${document.lastModified}`;

// ---------------- Navigation (hamburger) ----------------
const toggleBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

if (toggleBtn && nav) {
  // Set Expanded
  const setExpanded = (isOpen) => {
    toggleBtn.classList.toggle("is-open", isOpen);
    nav.classList.toggle("open", isOpen);
    nav.classList.toggle("closed", !isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  //  Open Menu
  toggleBtn.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("open");
    setExpanded(isOpen);
  });

  // Close Menu
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 699px)").matches) setExpanded(false);
    })
  );
}

// ---------------- Temple Filter ----------------
// Temple Array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
    {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 2",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg",
  },
  {
    templeName: "Portland Oregon Temple",
    location: "Portland, Oregon, United States",
    dedicated: "1989, August, 21",
    area: 80500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/portland-oregon-temple/portland-oregon-temple-1582.jpg",
  },
  {
    templeName: "Oakland California Temple",
    location: "Oakland, California, United States",
    dedicated: "1964, November, 19",
    area: 80157,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg",
  }
];

// Nav Filters
const filterHome = document.getElementById("filter-home");
const filterOld = document.getElementById("filter-old");
const filterNew = document.getElementById("filter-new");
const filterLarge = document.getElementById("filter-large");
const filterSmall = document.getElementById("filter-small");

// Initital Load (filters will reload)
createTempleCards();

// Filter: Home
filterHome.addEventListener("click", () => {
  createTempleCards();
});

// Filter: Old
filterOld.addEventListener("click", () => {
  const filteredTemples = temples.filter(
    (temple) => new Date(temple.dedicated).getFullYear() < 1900
  );
  createTempleCards(filteredTemples);
});

// Filter: New
filterNew.addEventListener("click", () => {
  const filteredTemples = temples.filter(
    (temple) => new Date(temple.dedicated).getFullYear() >= 1900
  );
  createTempleCards(filteredTemples);
});

// Filter: Large
filterLarge.addEventListener("click", () => {
  const filteredTemples = temples.filter((temple) => temple.area > 90000);
  createTempleCards(filteredTemples);
});

// Filter: Small
filterSmall.addEventListener("click", () => {
  const filteredTemples = temples.filter((temple) => temple.area < 10000);
  createTempleCards(filteredTemples);
}); 

// Format Dedicated Dates
function formatDedicatedDate(dateString) {
  const parts = dateString.split(/\s*,\s*/); 
  const [year, month, day] = parts;
  return `${month} ${day}, ${year}`;
} 

// CreateTemple Cards
function createTempleCards(filteredTemples = temples) {
  const container = document.getElementById("temple-container");
  container.innerHTML = filteredTemples.map(createTempleCard).join("");
}

// Create Temple Card
function createTempleCard(temple) {
  return `
    <figure>
        <figcaption>
          <h3>${temple.templeName}</h3>
          <p><strong>Location:</strong> ${temple.location}</p>
          <p><strong>Dedicated:</strong> ${formatDedicatedDate(temple.dedicated)}</p>
          <p><strong>Area:</strong> ${temple.area.toLocaleString("en-US")} sq ft</p>
        </figcaption>
        <img src="${temple.imageUrl}" alt="${temple.templeName}" width="350" loading="lazy">
    </figure>
`;
}