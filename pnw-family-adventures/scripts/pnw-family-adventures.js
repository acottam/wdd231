// ---- Footer ---- //
const today = new Date();
document.getElementById(
  "currentyear"
).innerHTML = `&copy;${today.getFullYear()}`;
document.querySelector(
  "#lastmodified"
).textContent = `Last Modification: ${document.lastModified}`;

// ---- Navigation ---- //
const toggleBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

if (toggleBtn && nav) {
  const setExpanded = (isOpen) => {
    toggleBtn.classList.toggle("is-open", isOpen);
    nav.classList.toggle("open", isOpen);
    nav.classList.toggle("closed", !isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("open");
    setExpanded(isOpen);
  });

  // ---- Close Nav ---- //
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 699px)").matches) setExpanded(false);
    })
  );
}

// ---- Active nav ---- //
(function setActiveNav() {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll("#primary-nav a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\/+$/, "") || "/";
    if (href === path) a.classList.add("is-active");
  });
})();

// ---- Featured (Home Page) ---- //
(function mountFeatured() {
  const el = document.getElementById("featured-grid");
  if (!el) return;
  const items = [
    {
      title: "Cannon Beach Tidepools",
      meta: "Oregon • Easy • 1-2 hrs",
      img: "images/tide-pools-01.webp",
    },
    {
      title: "Forest Park Loop",
      meta: "Oregon • Easy • 3 mi",
      img: "images/forest-park-loop.webp",
    },
    {
      title: "MOHAI (Seattle)",
      meta: "Washington • Museum • 2-3 hrs",
      img: "images/mohai-01.webp",
    },
    {
      title: "Mount Tabor Park",
      meta: "Oregon • Easy • 1-2 hrs",
      img: "images/mt-tabor-park-01.webp",
    },
  ];
  
  // ---- Set Content ---- //
  el.innerHTML = items
    .map(
      (i) => `
    <article class="card">
      <img src="${i.img}" alt="${i.title}" loading="lazy">
      <div class="card__body">
        <h3>${i.title}</h3>
        <p class="card__meta">${i.meta}</p>
      </div>
    </article>`
    )
    .join("");
})();


// ---- Adventures ---- //
(function adventuresList() {
  const grid = document.getElementById("adventures-grid");
  const form = document.getElementById("filters-form");
  if (!grid || !form) return;
  
  // ---- List of Adventures ---- //
  const data = [
    {
      title: "Latourell Falls",
      state: "OR",
      type: "hike",
      difficulty: "easy",
      meta: "1.9 mi loop • Stroller friendly",
      img: "images/latourell-falls-01.webp",
    },
    {
      title: "OMSI",
      state: "OR",
      type: "museum",
      difficulty: "easy",
      meta: "Rainy day • Hands-on exhibits",
      img: "images/omsi-01.webp",
    },
    {
      title: "Rattlesnake Ledge",
      state: "WA",
      type: "hike",
      difficulty: "moderate",
      meta: "4 mi out & back • Views",
      img: "images/rattlesnake-ledge-lake-01.webp",
    },
    {
      title: "Multnomah Falls",
      state: "OR",
      type: "hike",
      difficulty: "easy",
      meta: "Paved path to viewpoint • Restrooms • Crowds on weekends",
      img: "images/multnomah-falls-01.webp",
    },
    {
      title: "Silver Falls - South Falls Loop",
      state: "OR",
      type: "hike",
      difficulty: "moderate",
      meta: "2.6 mi loop • Walk behind a waterfall • Picnic spots",
      img: "images/silver-falls-south-falls-01.webp",
    },
    {
      title: "Cannon Beach - Haystack Rock",
      state: "OR",
      type: "park",
      difficulty: "easy",
      meta: "Beach walk • Tidepools at low tide • Parking fills fast",
      img: "images/cannon-beach-haystack-01.webp",
    },
    {
      title: "Fort Stevens - Peter Iredale Shipwreck",
      state: "OR",
      type: "park",
      difficulty: "easy",
      meta: "Beach access • Bunkers and bikes • Sunset favorite",
      img: "images/fort-stevens-peter-iredale-01.webp",
    },
    {
      title: "Hoyt Arboretum",
      state: "OR",
      type: "hike",
      difficulty: "easy",
      meta: "Stroller-friendly segments • Wood bridges • Parking lot",
      img: "images/hoyt-arboretum-01.webp",
    },
    {
      title: "Ape Cave Lava Tube",
      state: "WA",
      type: "hike",
      difficulty: "moderate",
      meta: "2.5 mi out & back • Bring lights and jackets • Timed entry in season",
      img: "images/ape-cave-01.webp",
    },
    {
      title: "Hoh Rain Forest - Hall of Mosses",
      state: "WA",
      type: "hike",
      difficulty: "easy",
      meta: "0.8 mi loop • Fairy-forest vibe • Rain-ready",
      img: "images/hoh-hall-of-mosses-01.webp",
    },
    {
      title: "Discovery Park Loop (Seattle)",
      state: "WA",
      type: "hike",
      difficulty: "moderate",
      meta: "2.8 mi loop • Lighthouse & bluff views • Bathrooms",
      img: "images/discovery-park-loop-01.webp",
    },
    {
      title: "Museum of Flight (Seattle)",
      state: "WA",
      type: "museum",
      difficulty: "easy",
      meta: "Hands-on aircraft • Full-day option • Café on site",
      img: "images/museum-of-flight-01.webp",
    },
    {
      title: "MOHAI - Museum of History & Industry",
      state: "WA",
      type: "museum",
      difficulty: "easy",
      meta: "Interactive exhibits • Lake Union views • Great rainy-day pick",
      img: "images/museums-of-northwest-01.webp",
    },
    {
      title: "Wooden Shoe Tulip Festival",
      state: "OR",
      type: "park",
      difficulty: "easy",
      meta: "Seasonal • Fields of tulips • Photos & food",
      img: "images/wooden-shoe-tulip-festival-01.webp",
    },
    {
      title: "Powell Butte Nature Park",
      state: "OR",
      type: "hike",
      difficulty: "easy",
      meta: "2-4 mi options • Meadow loop • Mt. Hood views",
      img: "images/powell-butte-01.webp",
    },
    {
      title: "Snoqualmie Falls",
      state: "WA",
      type: "hike",
      difficulty: "easy",
      meta: "Paved viewpoints • Short forest trail • Busy weekends",
      img: "images/snoqualmie-falls-01.webp",
    },
  ];

  // ---- Render Content ---- //
  const render = (items) => {
    grid.innerHTML = items
      .map(
        (i) => `
      <article class="card">
        <img src="${i.img}" alt="${i.title}" loading="lazy">
        <div class="card__body">
          <h3>${i.title}</h3>
          <p class="card__meta">${i.state} • ${i.type} • ${i.meta}</p>
        </div>
      </article>`
      )
      .join("");
  };
  render(data);

  // ---- Filters on Adventures Page ---- //
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const q = (fd.get("q") || "").toString().toLowerCase();
    const filtered = data.filter(
      (i) =>
        (!fd.get("state") || i.state === fd.get("state")) &&
        (!fd.get("difficulty") || i.difficulty === fd.get("difficulty")) &&
        (!fd.get("type") || i.type === fd.get("type")) &&
        (!q || `${i.title} ${i.meta}`.toLowerCase().includes(q))
    );
    render(filtered);
  });

})();

// ---- Contact form ---- //
(function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // ---- Form Fields ---- //
  const els = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    topic: document.getElementById("topic"),
    message: document.getElementById("message"),
    errName: document.getElementById("err-name"),
    errEmail: document.getElementById("err-email"),
    errTopic: document.getElementById("err-topic"),
    errMessage: document.getElementById("err-message"),
    success: document.getElementById("contact-form-success"),
    count: document.getElementById("submission-count"),
  };

  // ---- Show Error ---- //
  const showError = (el, msg) => {
    el.textContent = msg || "";
  };

  // ---- Clear Errors ---- //
  const clearErrors = () =>
    [els.errName, els.errEmail, els.errTopic, els.errMessage].forEach((e) =>
      showError(e, "")
    );

  // ---- Handle Topic Select ---- //
  function updateTopicClass() {
    els.topic.classList.toggle('has-value', els.topic.value !== '');
  }
  els.topic.addEventListener('change', updateTopicClass);
  els.topic.addEventListener('input', updateTopicClass);

  // ---- Contact Submit Button ---- //
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;
    // Name
    if (!els.name.value.trim()) {
      showError(els.errName, "Please enter your name.");
      valid = false;
    }
    // Email
    if (!els.email.value.trim() || !els.email.checkValidity()) {
      showError(els.errEmail, "Please enter a valid email.");
      valid = false;
    }
    // Topic
    if (!els.topic.value.trim()) {
      showError(els.errTopic, "Please select a topic.");
      valid = false;
    } else {
      els.topic.className = "has-value";
    }
    // Message
    if (!els.message.value.trim()) {
      showError(els.errMessage, "Please include a message.");
      valid = false;
    }

    // No Errors
    if (!valid) return;

    // Submission Tracking 
    const key = "pnw-submission-count";
    const newCount = parseInt(localStorage.getItem(key) || "0", 10) + 1;
    
    // Store Contents in Local Storage
    localStorage.setItem(key, String(newCount));
    els.count.textContent = newCount;
    els.success.hidden = false;

    // Back to top
    window.scrollTo({ top: 120, behavior: 'smooth' });
    
    // Reset Form
    form.reset();
    els.topic.className = "";

  });
})();
