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

  // Close on link click (mobile only)
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 699px)").matches) setExpanded(false);
    })
  );
}