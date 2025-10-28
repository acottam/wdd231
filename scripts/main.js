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

// ---- Footer ---- //
const today = new Date();
document.getElementById(
  "currentyear"
).innerHTML = `&copy;${today.getFullYear()}`;
document.querySelector(
  "#lastmodified"
).textContent = `Last Modification: ${document.lastModified}`;