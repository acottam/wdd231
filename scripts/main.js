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
  
// ---- Courses Grid ---- //
// Use: `courses` array defined in scripts/courses.js
(function initCourses() {
  const grid = document.getElementById("course-grid");
  const totalEl = document.getElementById("credit-total");
  const filterBtns = document.querySelectorAll(".filter");

  if (!grid || !totalEl || !filterBtns.length || !window.courses) return;

  // Render Articles
  const render = (subject = "ALL") => {
    
    // Filter List
    const list =
      subject === "ALL"
        ? courses
        : courses.filter((c) => c.subject === subject);

    // Build Article Blocks
    grid.innerHTML = list
      .map(
        (c) => `
          <article class="card ${c.completed ? "course--completed" : "course--incomplete"}">
            <div class="card__body">
              <h3>${c.subject} ${c.number} -  ${c.title}</h3>
              <p class="card__meta">${c.credits} credits • ${c.certificate}</p>
              <p>${c.description}</p>
              <p class="card__meta">Tech: ${c.technology.join(", ")}</p>
            </div>
          </article>`
      )
      .join("");

    // Credit Hours
    const credits = list.reduce(
      (sum, c) => sum + (Number(c.credits) || 0),
      0
    );
    
    // Display Total Credits1
    totalEl.textContent = `Total credits in view: ${credits}`;
  };

  // Default view
  render("ALL");

  // Add Clicks for filters
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.dataset.filter);
    });
  });
})();

// ---- Footer ---- //
const today = new Date();
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;
document.querySelector("#lastmodified").textContent = `Last Modification: ${document.lastModified}`;