// ---------------- Footer ----------------
const today = new Date();
const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.innerHTML = `&copy;${today.getFullYear()}`;
const lmEl = document.getElementById("lastmodified");
if (lmEl) lmEl.textContent = `Last Modification: ${document.lastModified}`;

// ---------------- Products Array (given) ----------------
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];

// Populate the Product Name <select> from the array
const productSelect = document.getElementById("productname");
if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id; // value uses array's id
    option.textContent = product.name; // text uses array's name
    productSelect.appendChild(option);
  });
}
